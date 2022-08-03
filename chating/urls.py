from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('chat/<room_name>/', views.index, name='chat'),
    path('edit_message/<int:message_id>', views.Edit_message.as_view(), name='edit_message'),
    path('join_room', views.Join_Channel.as_view(), name='join_channel'),
]
