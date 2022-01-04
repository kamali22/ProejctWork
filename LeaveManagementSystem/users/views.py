from django.shortcuts import render, redirect
from .serializers import LoginSerializer
from django.contrib.auth.models import User
from rest_framework import mixins, generics
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.http.response import HttpResponseRedirect

class LoginUser(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        print(request.data['username'])
        print(request.data['password'])
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username,password=password)
        if user is not None:
            login(request,user)
            if user.is_staff and not user.is_superuser : #Checking manager
                print("manager")
                return HttpResponseRedirect('/approves')
            elif user.is_active and not user.is_staff:  #Checking Employee
                print("employee")
                return HttpResponseRedirect('/leave')
            elif user.is_staff and user.is_superuser:   #Checking admin
                print("admin")
                return HttpResponseRedirect('/admin')
        else:
            print("Invalid input!!!")
            messages.error(request, "Invalid Login Credentials!")
            return HttpResponseRedirect('/api-login') 
