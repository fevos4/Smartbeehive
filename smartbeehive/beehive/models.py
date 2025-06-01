from django.db import models
from django.conf import settings

class Beehive(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, null=True, blank=True)
    external_temperature = models.CharField(max_length=255, null=True, blank=True)  # Replaces CO2
    temperature = models.CharField(max_length=255, null=True, blank=True)
    humidity = models.CharField(max_length=255, null=True, blank=True)
    weight = models.CharField(max_length=255, null=True, blank=True)
    battery_level = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class BeehiveMetrics(models.Model):
    beehive = models.ForeignKey(Beehive, related_name='metrics', on_delete=models.CASCADE)
    external_temperature = models.FloatField(max_length=255)  # Replaces CO2
    temperature = models.FloatField(max_length=255)
    humidity = models.FloatField(max_length=255)
    weight = models.FloatField(max_length=255)
    battery_level = models.FloatField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
