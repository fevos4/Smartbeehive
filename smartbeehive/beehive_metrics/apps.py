from django.apps import AppConfig


class BeehiveMetricsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'beehive_metrics'


def ready(self):
    import beehive_metrics.signals
