from django.db import models

# Create your models here.
# beehive_metrics/models.py



class Beehive(models.Model):
    name = models.CharField(max_length=255)  # Assuming there's a Beehive model

class BeehiveMetrics(models.Model):
    beehive = models.ForeignKey(Beehive, on_delete=models.CASCADE, related_name='metrics')
    CO2 = models.FloatField()
    Temperature = models.FloatField()
    Humidity = models.FloatField()
    Weight = models.FloatField()
    Battery_level = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
