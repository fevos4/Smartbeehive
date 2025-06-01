from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import BeehiveMetrics
from notifications.models import Notification
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

def check_and_send_alerts(user, metric):
    alerts = []

    if metric.Temperature < 32 or metric.Temperature > 35:
        alerts.append(f"Internal temperature {metric.Temperature}°C is outside the optimal range (32–35°C).")

    if metric.Humidity < 50 or metric.Humidity > 70:
        alerts.append(f"Humidity {metric.Humidity}% is outside the optimal range (50–70%).")

    if metric.external_temperature < 0 or metric.external_temperature > 40:
        alerts.append(f"External temperature {metric.external_temperature}°C is outside the optimal range (0–40°C).")

    if metric.Weight <= 10:
        alerts.append(f"Weight {metric.Weight}kg is below the safe threshold (>10kg).")

    if metric.Battery_level < 20:
        alerts.append(f"Battery level is low at {metric.Battery_level}% (<20%).")

    channel_layer = get_channel_layer()
    if channel_layer is None:
        return

    for alert in alerts:
        Notification.objects.create(
            user=user,
            notification_type="Alert",
            notification_message=alert
        )

        # Send WebSocket message
        async_to_sync(channel_layer.group_send)(
            f"user_{user.id}",
            {
                "type": "send_notification",
                "message": alert
            }
        )

        print("DEBUG (signals): WebSocket alert sent:", alert)

@receiver(post_save, sender=BeehiveMetrics)
def post_save_beehive_metric(sender, instance, created, **kwargs):
    if created:
        user = instance.beehive.user  # assuming beehive has a foreign key to user
        if user:
            check_and_send_alerts(user, instance)
