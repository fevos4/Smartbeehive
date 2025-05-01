from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Beehive, BeehiveMetrics
from .serializers import BeehiveSerializer, BeehiveMetricsSerializer
from django.shortcuts import get_object_or_404
import csv
from django.http import HttpResponse
from rest_framework.viewsets import ViewSet
from datetime import datetime
from rest_framework.exceptions import ValidationError

# ----------------------------------------------------------------------------
# API View Endpoints for Beehive Operations
# ----------------------------------------------------------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_beehive_history(request, pk):
    beehive = get_object_or_404(Beehive, pk=pk, user=request.user)
    metrics = beehive.metrics.all()

    # Optional query params: ?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
    start_date = request.query_params.get('start_date')
    end_date = request.query_params.get('end_date')

    if start_date:
        try:
            start = datetime.fromisoformat(start_date)
            metrics = metrics.filter(created_at__gte=start)
        except ValueError:
            raise ValidationError({'start_date': 'Invalid date format. Use YYYY-MM-DD'})

    if end_date:
        try:
            end = datetime.fromisoformat(end_date)
            metrics = metrics.filter(created_at__lte=end)
        except ValueError:
            raise ValidationError({'end_date': 'Invalid date format. Use YYYY-MM-DD'})

    metrics = metrics.order_by('-created_at')
    serializer = BeehiveMetricsSerializer(metrics, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_beehives(request):
    beehives = Beehive.objects.filter(user=request.user)
    serializer = BeehiveSerializer(beehives, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_beehive(request):
    data = request.data
    serializer = BeehiveSerializer(data=data)
    if serializer.is_valid():
        beehive = serializer.save(user=request.user)
        BeehiveMetrics.objects.create(
            beehive=beehive,
            ExternalTemperature=data.get('ExternalTemperature', 4),
            Temperature=data.get('Temperature', 3),
            Humidity=data.get('Humidity', 2),
            Weight=data.get('Weight', 1),
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_beehive(request, pk):
    try:
        beehive = Beehive.objects.get(id=pk, user=request.user)
    except Beehive.DoesNotExist:
        return Response({'error': 'Beehive not found'}, status=status.HTTP_404_NOT_FOUND)

    latest_metrics = BeehiveMetrics.objects.filter(beehive=beehive).order_by('-created_at').first()
    beehive_data = BeehiveSerializer(beehive).data
    if latest_metrics:
        beehive_data['ExternalTemperature'] = latest_metrics.ExternalTemperature
        beehive_data['Temperature'] = latest_metrics.Temperature
        beehive_data['Humidity'] = latest_metrics.Humidity
        beehive_data['Weight'] = latest_metrics.Weight
    return Response(beehive_data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_beehive(request, pk):
    try:
        beehive = Beehive.objects.get(id=pk, user=request.user)
    except Beehive.DoesNotExist:
        return Response({'error': 'Beehive not found'}, status=status.HTTP_404_NOT_FOUND)

    metrics_data = request.data
    beehive_metrics = BeehiveMetrics.objects.filter(beehive=beehive).order_by('-created_at').first()
    if beehive_metrics:
        for key, value in metrics_data.items():
            if hasattr(beehive_metrics, key):
                setattr(beehive_metrics, key, value)
        beehive_metrics.save()
        return Response(BeehiveMetricsSerializer(beehive_metrics).data)
    return Response({'error': 'Metrics not found for update'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_beehive(request, pk):
    try:
        beehive = Beehive.objects.get(id=pk, user=request.user)
    except Beehive.DoesNotExist:
        return Response({'error': 'Beehive not found'}, status=status.HTTP_404_NOT_FOUND)

    beehive.delete()
    return Response({'message': 'Beehive deleted successfully'}, status=status.HTTP_200_OK)

# ----------------------------------------------------------------------------
# ViewSet for Beehive Operations
# ----------------------------------------------------------------------------

class BeehiveViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        beehives = Beehive.objects.filter(user=request.user)
        for beehive in beehives:
            latest_metrics = beehive.metrics.order_by('-created_at').first()
            if latest_metrics:
                beehive.ExternalTemperature = latest_metrics.ExternalTemperature
                beehive.Temperature = latest_metrics.Temperature
                beehive.Humidity = latest_metrics.Humidity
                beehive.Weight = latest_metrics.Weight
        serializer = BeehiveSerializer(beehives, many=True)
        return Response({"beehives": serializer.data})

    def create(self, request):
        serializer = BeehiveSerializer(data=request.data)
        if serializer.is_valid():
            beehive = serializer.save(user=request.user)
            metric_data = request.data
            metric_data['beehive'] = beehive.id
            metrics_serializer = BeehiveMetricsSerializer(data=metric_data)
            if metrics_serializer.is_valid():
                metrics_serializer.save()
                return Response({
                    "beehive": serializer.data,
                    "beehiveMetrics": metrics_serializer.data
                }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        beehive = get_object_or_404(Beehive, pk=pk)
        latest = beehive.metrics.order_by('-created_at').first()
        data = BeehiveSerializer(beehive).data
        if latest:
            data.update(BeehiveMetricsSerializer(latest).data)
        return Response(data)

    def update(self, request, pk=None):
        beehive = get_object_or_404(Beehive, pk=pk)
        serializer = BeehiveSerializer(beehive, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        beehive = get_object_or_404(Beehive, pk=pk)
        beehive.delete()
        return Response({"message": "Beehive deleted successfully"}, status=204)

# ----------------------------------------------------------------------------
# CSV Export of Beehive Metrics
# ----------------------------------------------------------------------------

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def export_metrics_csv(request, beehive_id):
    beehive = get_object_or_404(Beehive, pk=beehive_id, user=request.user)
    metrics = beehive.metrics.all().order_by('-created_at')

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = f'attachment; filename="beehive_{beehive_id}_metrics.csv"'

    writer = csv.writer(response)
    writer.writerow(['created_at', 'ExternalTemperature', 'Temperature', 'Humidity', 'Weight'])
    for m in metrics:
        writer.writerow([m.created_at, m.ExternalTemperature, m.Temperature, m.Humidity, m.Weight])

    return response
