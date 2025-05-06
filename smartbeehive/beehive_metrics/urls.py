from django.urls import path
from . import views

urlpatterns = [
    path('', views.metrics_list),  # Handles GET and POST
    path('by-beehive/<int:beehive_id>/', views.get_metrics_by_beehive_id),
    path('update/<int:id>/', views.update_metrics),
    path('delete/<int:id>/', views.delete_metrics),
    path('export/<int:beehive_id>/', views.export_metrics_csv),
]
