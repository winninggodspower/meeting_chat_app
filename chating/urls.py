from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('edit_post/<int:message_id>', views.index, name='index')
]
