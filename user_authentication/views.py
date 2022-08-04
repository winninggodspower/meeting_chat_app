from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib import messages

# modules needed for user authentication
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


#for pasword reset
from django.contrib.auth import views

# importing the forms
from .forms import LoginForm, RegisterForm, UserprofileForm

# Create your views here.


def chat(request):
    return render(request, 'index.html',)


# routes for user registration
def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        print(request.FILES)
        profile_form = UserprofileForm(request.POST ,request.FILES)

        if form.is_valid() and profile_form.is_valid():
            # form.save only works when form is created from a model
            user = form.save()

            profile = profile_form.save(commit = False)
            profile.user = user
            profile_form.save()

            login(request, user)
            messages.success(request, 'Succesfully created account')
            return redirect('/join_room')
        else:

            # rendering the template again if the form is not valid with the prepopulated data.
            messages.error(request, 'Unsuccesful registration')            
            return render(request, 'register.html', {'form': form, 'profile_form': profile_form})

    else:
        form = RegisterForm()
        profile_form = UserprofileForm()
        return render(request, 'register.html', {'form': form, 'profile_form': profile_form})


def login_user(request):
    # redirect user to chat if already logged in
    if request.user.is_authenticated:
        messages.info(request, 'You Are Already Logged In')
        return redirect('/join_room')

    if request.method == 'POST':
        print('a post message sent')
        form = LoginForm(request.POST)

        if form.is_valid():
            print('it is valid')
            print(form.cleaned_data)
            
            username = User.objects.filter(email = form.cleaned_data.get('email')).first()
            # the authenticate function returns the user object if the user is found else it returns none
            user = authenticate(username = username, password=form.cleaned_data.get('password'))
            if user:
                login(request, user)
                messages.success(request, 
                f'successfully logged in as {user.username}')
                return redirect('/join_room')
            else:
                messages.error(request, 'user not found')
                # form.add_error('user not found')
                return redirect('/login')

        # if form is not valid render the template again with pre populated data
        else:
            print('its not valid')
            print(form.non_field_errors())
            return render(request, 'login.html', {'form': form})
    else:
        form = LoginForm()
        return render(request, 'login.html', {'form': form})


@login_required
def logout_user(request):
    if request.user.is_authenticated:
        logout(request)
        messages.info(request, 'successfully logged out')
        return redirect('/login')