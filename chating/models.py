from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# from asgiref.sync import sync_to_async

# Create your models here.
class Room(models.Model):
    room_name = models.CharField(max_length = 30)
    users = models.ManyToManyField(User, related_name='rooms')

    @classmethod
    def add(self, room_name, user):
        room, created = self.objects.get_or_create(room_name = room_name)
        print(f'new room created {room}') if created else print(f'joined room {room}')
        room.users.add(user)
        return (room, created)

    @classmethod
    def users_count(self, room_name):
        Room.objects.filter(room_name = room_name).first().users.all()
        rooms = self.objects.filter(room_name=room_name)
        if rooms.exists():
            return rooms.first().users.count()
        return 0

    @classmethod
    def remove_user(self, user, room_name):
        room = self.objects.filter(room_name=room_name)
        if room.exists():
            room.first().users.remove(user)
            print('room user remaing ' + str(self.users_count(room_name)) )
            if self.users_count(room_name) == 0:
                self.objects.filter(room_name = room_name).first().delete()
                print('Deleted room ')

    def __str__(self):
        return self.room_name


class Message(models.Model):
    author = models.ForeignKey(User, on_delete= models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, null=True)

    reply = models.BooleanField()
    to = models.CharField(max_length = 30, default=None, null=True)
    content = models.TextField()
    votes = models.IntegerField(default=0)
    votes_by = models.TextField(default='')
    timestamp = models.DateTimeField(default=timezone.now())

    def __str__(self):
        return self.author.username

    @classmethod
    def last_10_messages(self, room_name):
        room = Room.objects.filter(room_name = room_name).first()
        if room:
            return Message.objects.filter(room = room).order_by('-timestamp').all()[:11:-1]
        else:
            print('room not found')
            return []
    
