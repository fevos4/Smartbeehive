from django.db import models
from django.contrib.auth.models import User

class SensorData(models.Model):
    """
    Model to store sensor data
    """
    # TEMPERATURE_UNIT_CHOICES = [
    #     ('C', 'Celsius'),
    #     ('F', 'Fahrenheit')
    # ]

    # HUMIDITY_UNIT_CHOICES = [
    #     ('%', 'Percentage')
    # ]

    # WEIGHT_UNIT_CHOICES = [
    #     ('kg', 'Kilogram'),
    #     ('lb', 'Pound')
    # ]

    id = models.AutoField(primary_key=True)
    hive_id = models.ForeignKey('Hive', on_delete=models.CASCADE)
    temperature_inside = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    temperature_outside = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    # temperature_unit = models.CharField(max_length=1, choices=TEMPERATURE_UNIT_CHOICES, default='C')
    humidity_inside = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    #humidity_outside = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    # humidity_unit = models.CharField(max_length=1, choices=HUMIDITY_UNIT_CHOICES, default='%')
    weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    # weight_unit = models.CharField(max_length=2, choices=WEIGHT_UNIT_CHOICES, default='kg')
    created_at = models.DateTimeField(auto_now_add=True)

class Hive(models.Model):
    """
    Model to store hive information
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

# models.py
class ModelPrediction(models.Model):
    """
    Model to store model prediction/inference results
    """
    id = models.AutoField(primary_key=True)
    hive_id = models.ForeignKey('Hive', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    prediction = models.TextField(blank=True, null=True)
    confidence = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Alert(models.Model):
    ALERT_TYPE_CHOICES = [
        ('TEMP', 'Temperature'),
        ('HUMIDITY', 'Humidity'),
        ('WEIGHT', 'Weight'),
        ('ACTIVITY', 'Activity'),
        ('OTHER', 'Other'),
    ]

    ALERT_SEVERITY_CHOICES = [
        ('INFO', 'Info'),
        ('WARNING', 'Warning'),
        ('CRITICAL', 'Critical'),
    ]

    id = models.AutoField(primary_key=True)
    hive = models.ForeignKey(Hive, on_delete=models.CASCADE)
    alert_type = models.CharField(max_length=10, choices=ALERT_TYPE_CHOICES)
    alert_severity = models.CharField(max_length=10, choices=ALERT_SEVERITY_CHOICES)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    acknowledged = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.hive.name} - {self.alert_type} - {self.alert_severity}"