from rest_framework import serializers
from .models import Beehive, BeehiveMetrics

class BeehiveMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeehiveMetrics
        fields = '__all__'

class BeehiveSerializer(serializers.ModelSerializer):
    metrics = BeehiveMetricsSerializer(many=True, read_only=True)

    class Meta:
        model = Beehive
        fields = '__all__'
