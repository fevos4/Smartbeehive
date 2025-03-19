from rest_framework.response import Response
from rest_framework.views import APIView
from.models import SensorData, ModelPrediction, Hive, Alert
from.serializers import SensorDataSerializer, ModelPredictionSerializer

class SensorDataView(APIView):
    def post(self, request):
        print(request.data)
        serializer = SensorDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        print(serializer.errors)
        return Response(serializer.errors, status=400)

class ModelPredictionView(APIView):
    def post(self, request):
        print(request.data)
        serializer = ModelPredictionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        print(serializer.errors)
        return Response(serializer.errors, status=400)

class AlertView(APIView):
    def post(self, request):
        hive_id = request.data['hive_id']
        alert_type = request.data['alert_type']
        alert_severity = request.data['alert_severity']
        message = request.data['message']

        hive = Hive.objects.get(id=hive_id)
        alert = Alert(
            hive=hive,
            alert_type=alert_type,
            alert_severity=alert_severity,
            message=message,
        )
        alert.save()

        return Response({'message': 'Alert created successfully'}, status=201)