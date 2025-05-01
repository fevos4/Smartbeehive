from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from .serializers import NotificationSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_notifications(request):
    notifications = Notification.objects.filter(user=request.user, is_read=False)
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_all_notifications(request):
    Notification.objects.filter(user=request.user).update(is_read=True)
    return Response({'message': 'Notifications updated successfully'})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_notification_by_id(request, pk):
    notification = get_object_or_404(Notification, pk=pk, user=request.user)
    notification.is_read = True
    notification.save()
    serializer = NotificationSerializer(notification)
    return Response(serializer.data)
