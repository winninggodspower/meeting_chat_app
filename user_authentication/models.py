from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_img = models.ImageField(upload_to='USERS_IMG')

    def __str__(self):
        return self.user.username