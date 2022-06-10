from django import forms
from django.forms import ModelForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

from django.core import validators
# import the model here to populate the form
from .models import UserProfile


def validate_email(email):
    if not User.objects.filter(email = email).first():
        raise forms.ValidationError('Email not found')

class LoginForm(forms.Form):

    email = forms.EmailField(label='Email', max_length=70, validators= [validate_email])
    password = forms.CharField(widget=forms.PasswordInput, min_length=6)
    remember_me = forms.BooleanField(label='Remember me')

    email.widget.attrs.update({'class' : 'form-control',})
    password.widget.attrs.update({'class' : 'form-control',})
    remember_me.widget.attrs.update({'class' : 'form-check-input','checked': 'True'})

class RegisterForm(UserCreationForm):
    username = forms.CharField(required=True, max_length=30, widget = forms.TextInput(attrs={'class':'form-control form-control-lg'}))
    email = forms.EmailField(required=True, max_length=30,widget = forms.EmailInput(attrs={'class' : 'form-control form-control-lg'}))
    password1 = forms.CharField(required=True, widget = forms.PasswordInput(attrs={'class' : 'form-control form-control-lg'}))
    password2 = forms.CharField(required=True, widget = forms.PasswordInput(attrs={'class' : 'form-control form-control-lg'}))
    class Meta:
        model = User
        # specify field to be displayed from model here
        fields = ('username','email','password1', 'password2')
      
    def save(self, commit = True):
        user = super(RegisterForm, self).save(commit=False)
        user.email = self.cleaned_data.get('email')
        user.user_img = self.cleaned_data.get('user_img')
        if commit:
            user.save()
        return user

class UserprofileForm(ModelForm):
    user_img = forms.ImageField(required=True, widget = forms.FileInput(attrs={'class' : 'form-control form-control-lg'}))
    
    class Meta:
        model = UserProfile
        fields = ('user_img',)