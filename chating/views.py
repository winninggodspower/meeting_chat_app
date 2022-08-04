from urllib import request
from django.contrib.auth.decorators import login_required
from django.shortcuts import render,redirect ,get_object_or_404
from django.contrib import messages
from django.views import View

from django.contrib.auth.models import User

from .models import Message, Room

def index(request, room_name):
    room_users = Room.objects.filter(room_name = room_name).first().users.all()
    if not request.user.is_authenticated:
        return redirect('/login')
    context = {'user': request.user, 'room_name': room_name, 'room_users': room_users}
    return render(request, 'index.html', context)

class Edit_message(View):
    
    def get(self, request, message_id):
        
        message = get_object_or_404(Message, pk = int(message_id))

        # redirecting user if he is not the author of the post
        if request.user != message.author:
            messages.error(request, "You don't have permision to edit this file")
            return redirect('index')
        
        context = {'message_id': message.id, 'message_content': message.content}
        return render(request, 'edit-post.html', context)
    
    def post(self, request, message_id):
        message = get_object_or_404(Message, pk = int(message_id))

        # redirecting user if he is not the author of the post
        if request.user != message.author:
            messages.error(request, "You don't have permision to edit this file")
        
        message.content = request.POST.get('content')
        message.save()

        messages.success(request, "successfully edited post")
        return redirect('index')


class Join_Channel(View):
    # @login_required
    def get(self, request):
        return render(request, 'join_channel.html')

    def post(self, request):
        room_name = request.POST.get('room_name')
        return redirect('chat', room_name = room_name)

