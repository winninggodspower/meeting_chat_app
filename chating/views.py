# chat/views.py
from django.shortcuts import render

def index(request):
    context = {'user': request.user}
    return render(request, 'index.html', context)

def edit_message(request, message_id):
    return render(request, 'edit-post.html')
