from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BeehiveViewSet, export_metrics_csv, get_beehives, create_beehive, get_beehive, update_beehive, delete_beehive

# Initialize the router and register the BeehiveViewSet
router = DefaultRouter()
router.register(r'beehives', BeehiveViewSet, basename='beehive')

urlpatterns = [
    # URL patterns for the function-based views
    path('api/beehives/', get_beehives, name='get_beehives'),
    path('api/beehive/', create_beehive, name='create_beehive'),
    path('api/beehive/<int:pk>/', get_beehive, name='get_beehive'),
    path('api/beehive/<int:pk>/update/', update_beehive, name='update_beehive'),
    path('api/beehive/<int:pk>/delete/', delete_beehive, name='delete_beehive'),
    
    # URL pattern for the ViewSet routes (using DefaultRouter)
    path('', include(router.urls)),
    
    # URL pattern for exporting metrics to CSV
    path('beehive-metrics/export/<int:beehive_id>/', export_metrics_csv, name='export-metrics'),
]
