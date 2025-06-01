from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/alerts/', consumers.NotificationConsumer.as_asgi()),
]
