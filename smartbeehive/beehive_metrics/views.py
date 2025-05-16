from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import BeehiveMetrics
from .serializers import BeehiveMetricsSerializer
from .csv_exporter import generate_csv_response

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def metrics_list(request):
    if request.method == 'GET':
        metrics = BeehiveMetrics.objects.select_related('beehive').all()
        serializer = BeehiveMetricsSerializer(metrics, many=True)
        return Response({'beehiveMetrics': serializer.data})

    elif request.method == 'POST':
        serializer = BeehiveMetricsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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
