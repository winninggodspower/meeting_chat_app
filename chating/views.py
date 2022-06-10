# chat/views.py
from django.shortcuts import render

def index(request):
    context = {'user': request.user}
    return render(request, 'index.html', context)
