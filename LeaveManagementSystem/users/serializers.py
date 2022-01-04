from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.models import User

class LoginSerializer(serializers.ModelSerializer):
    #user = UserSerializer(many=True)
    class Meta:
        model = User
        fields = ("username", "password")

class UserSerializer(serializers.ModelSerializer):
    #login = LoginSerializer(many=True)
    class Meta:
        model = UserProfile 
        fields = "__all__" 
