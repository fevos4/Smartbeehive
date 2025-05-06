from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Beehive, BeehiveMetrics
from .serializers import BeehiveSerializer, BeehiveMetricsSerializer
from django.shortcuts import get_object_or_404

# Get all beehives
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_beehives(request):
    beehives = Beehive.objects.filter(user=request.user)
    serializer = BeehiveSerializer(beehives, many=True)
    return Response(serializer.data)

# Create a new beehive
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_beehive(request):
    data = request.data
    if not all(key in data for key in ('name', 'location', 'CO2', 'temperature', 'humidity', 'weight', 'battery_level')):
        return Response({"error": "All fields are mandatory"}, status=status.HTTP_400_BAD_REQUEST)
    
    beehive = Beehive.objects.create(
        user=request.user,
        name=data['name'],
        location=data['location'],
        CO2=data['CO2'],
        temperature=data['temperature'],
        humidity=data['humidity'],
        weight=data['weight'],
        battery_level=data['battery_level']
    )
    beehive_metrics = BeehiveMetrics.objects.create(
        beehive=beehive,
        CO2=data['CO2'],
        temperature=data['temperature'],
        humidity=data['humidity'],
        weight=data['weight'],
        battery_level=data['battery_level']
    )
    
    return Response({
        'beehive': BeehiveSerializer(beehive).data,
        'metrics': BeehiveMetricsSerializer(beehive_metrics).data
    }, status=status.HTTP_201_CREATED)

# Get a specific beehive by ID
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_beehive(request, id):
    beehive = get_object_or_404(Beehive, id=id, user=request.user)
    latest_metrics = BeehiveMetrics.objects.filter(beehive=beehive).first()
    if latest_metrics:
        beehive.CO2 = latest_metrics.CO2
        beehive.temperature = latest_metrics.temperature
        beehive.humidity = latest_metrics.humidity
        beehive.weight = latest_metrics.weight
        beehive.battery_level = latest_metrics.battery_level
        beehive.save()
    
    return Response(BeehiveSerializer(beehive).data)

# Update beehive data
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_beehive(request, id):
    beehive = get_object_or_404(Beehive, id=id, user=request.user)
    data = request.data
    
    beehive.CO2 = data.get('CO2', beehive.CO2)
    beehive.temperature = data.get('temperature', beehive.temperature)
    beehive.humidity = data.get('humidity', beehive.humidity)
    beehive.weight = data.get('weight', beehive.weight)
    beehive.battery_level = data.get('battery_level', beehive.battery_level)

    beehive.save()

    return Response(BeehiveSerializer(beehive).data)

# Delete a beehive
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_beehive(request, id):
    beehive = get_object_or_404(Beehive, id=id, user=request.user)
    beehive.delete()
    return Response({"message": "Beehive deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
