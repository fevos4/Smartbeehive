import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from notifications.middleware import JWTAuthMiddleware  # <-- your middleware

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "smartbeehive.settings")
django.setup()

import notifications.routing

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": JWTAuthMiddleware(
        URLRouter(
            notifications.routing.websocket_urlpatterns
        )
    ),
})
