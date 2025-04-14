from django.db import models
from django.contrib.auth.models import User

class Beehive(models.Model):
    name = models.CharField(max_length=255, default='samanta')
    location = models.CharField(max_length=255, default='Default Location')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='beehives', null=True, blank=True)

    def __str__(self):
        return self.name

class BeehiveMetrics(models.Model):
    beehive = models.ForeignKey(Beehive, on_delete=models.CASCADE, related_name='metrics')
    ExternalTemperature = models.FloatField(default=4)  # renamed from CO2
    Temperature = models.FloatField(default=3)
    Humidity = models.FloatField(default=2)
    Weight = models.FloatField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.beehive.name} - {self.created_at}"
