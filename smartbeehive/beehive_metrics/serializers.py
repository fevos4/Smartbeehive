# beehive_metrics/serializers.py

from rest_framework import serializers
from .models import BeehiveMetrics

class BeehiveMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeehiveMetrics
        fields = '__all__'
