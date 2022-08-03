from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('chat/', views.index, name='index'),
    path('edit_message/<int:message_id>', views.edit_message.as_view(), name='edit_message')
]
