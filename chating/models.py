from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Message(models.Model):
    author = models.ForeignKey(User, on_delete= models.CASCADE)
    reply = models.BooleanField()
    to = models.CharField(max_length = 30, default=None, null=True)
    content = models.TextField()
    votes = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.username

    def last_10_messages(self):
        return Message.objects.order_by('-timestamp').all()[:10:-1]
        