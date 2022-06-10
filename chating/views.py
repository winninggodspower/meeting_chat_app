from urllib import request
from django.shortcuts import render,redirect ,get_object_or_404
from django.contrib import messages
from django.views import View
from .models import Message

def index(request):
    context = {'user': request.user}
    return render(request, 'index.html', context)

class edit_message(View):
    
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


