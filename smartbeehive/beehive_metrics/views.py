from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import BeehiveMetrics
from .serializers import BeehiveMetricsSerializer
from .csv_exporter import generate_csv_response
from notifications.models import Notification
from django.contrib.auth.models import User

# For WebSocket alerts
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

print("🔍 Running alert check for user:", user)
print("🚨 Metric values:", metric.Temperature, metric.Humidity, metric.Weight, metric.Battery_level)

def check_and_send_alerts(user, metric):
    alerts = []

    if metric.Temperature < 32 or metric.Temperature > 35:
        alerts.append(f"Internal temperature {metric.Temperature}°C is outside the optimal range (32–35°C).")

    if metric.Humidity < 50 or metric.Humidity > 70:
        alerts.append(f"Humidity {metric.Humidity}% is outside the optimal range (50–70%).")

    if metric.external_temperature < 0 or metric.external_temperature > 40:
        alerts.append(f"External temperature {metric.external_temperature}°C is outside the optimal range (0–40°C).")

    if metric.Weight <= 10:
        alerts.append(f"Weight {metric.Weight}kg is below the safe threshold (>10kg).")

    if metric.Battery_level < 20:
        alerts.append(f"Battery level is low at {metric.Battery_level}% (<20%).")

    channel_layer = get_channel_layer()

    for alert in alerts:
        Notification.objects.create(
            user=user,
            notification_type="Alert",
            notification_message=alert
        )

        # Send to WebSocket group
        async_to_sync(channel_layer.group_send)(
            f"user_{user.id}",
            {
                "type": "send_notification",
                "message": alert
            }
        )

        print("DEBUG: Sent WebSocket alert:", alert)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def metrics_list(request):
    if request.method == 'GET':
        metrics = BeehiveMetrics.objects.select_related('beehive').all()
        serializer = BeehiveMetricsSerializer(metrics, many=True)
        return Response({'beehiveMetrics': serializer.data})

    elif request.method == 'POST':
        print("DEBUG: POST Data =", request.data)
        serializer = BeehiveMetricsSerializer(data=request.data)
        if serializer.is_valid():
            metric = serializer.save()
            check_and_send_alerts(request.user, metric)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("DEBUG: Serializer Errors =", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_metrics_by_beehive_id(request, beehive_id):
    metrics = BeehiveMetrics.objects.filter(beehive_id=beehive_id)
    if not metrics.exists():
        return Response({'detail': 'Beehive metrics not found'}, status=status.HTTP_404_NOT_FOUND)

    data = [
        {
            'createdAt': metric.created_at,
            'temperature': metric.Temperature,
            'humidity': metric.Humidity,
            'externalTemperature': metric.external_temperature
        }
        for metric in metrics
    ]
    return Response(data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_metrics(request, id):
    try:
        metric = BeehiveMetrics.objects.get(id=id)
    except BeehiveMetrics.DoesNotExist:
        return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = BeehiveMetricsSerializer(metric, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_metrics(request, id):
    try:
        metric = BeehiveMetrics.objects.get(id=id)
        metric.delete()
        return Response({'message': 'Beehive metrics deleted successfully'}, status=status.HTTP_200_OK)
    except BeehiveMetrics.DoesNotExist:
        return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def export_metrics_csv(request, beehive_id):
    return generate_csv_response(beehive_id)
