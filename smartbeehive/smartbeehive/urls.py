from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Swagger Schema View
schema_view = get_schema_view(
    openapi.Info(
        title="Beehive API",
        default_version='v1',
        description="API for managing beehives and their metrics",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@beehive.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),  # You can change to IsAuthenticated if needed
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # API routes
    path('', include('app.urls')),
    path('', include('act_auth.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/beehive-metrics/', include('beehive_metrics.urls')),
    path('api/beehive/', include('beehive.urls')),

    # JWT Auth
    path('act_auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('act_auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Swagger UI
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),  # Optional: Redoc UI
]
