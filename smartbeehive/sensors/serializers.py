from rest_framework import serializers
from .models import Beehive, BeehiveMetrics

class BeehiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beehive
        fields = '__all__'

class BeehiveMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeehiveMetrics
        fields = '__all__'
