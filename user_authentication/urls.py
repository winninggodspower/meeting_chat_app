from django.contrib import admin
from django.urls import path, include, re_path
from user_authentication import views

urlpatterns = [
    path('login/', views.login_user, name='login'),
    path('register/', views.register, name='register'),
    path('logout/', views.logout_user, name='logout'),
    re_path('^', include('django.contrib.auth.urls'))

]