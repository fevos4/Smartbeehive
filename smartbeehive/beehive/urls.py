from django.urls import path
from . import views

urlpatterns = [
    path('api/data/', views.get_beehives, name='get_beehives'),
    path('api/data/', views.create_beehive, name='create_beehive'),
    path('api/data/<int:id>/', views.get_beehive, name='get_beehive'),
    path('api/data/<int:id>/update/', views.update_beehive, name='update_beehive'),
    path('api/data/<int:id>/delete/', views.delete_beehive, name='delete_beehive'),
]
