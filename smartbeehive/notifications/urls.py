from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_all_notifications, name='get_all_notifications'),
    path('mark-all/', views.update_all_notifications, name='update_all_notifications'),
    path('<int:pk>/mark/', views.update_notification_by_id, name='update_notification_by_id'),
    
]
