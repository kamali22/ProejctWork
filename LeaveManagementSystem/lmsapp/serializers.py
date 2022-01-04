from rest_framework import serializers
from .models import LeaveRequest
from users.serializers import UserSerializer
from django.contrib.auth.models import User

class HistorySerializer(serializers.ModelSerializer):   #Display list of leave history
    class Meta:
        model = LeaveRequest
        fields = "__all__"
     
class ListSerializer(serializers.ModelSerializer):      #Displays list of requested leave
    class Meta:
        model = LeaveRequest
        exclude = ("cancel_reason",)

class RequestSerializer(serializers.ModelSerializer):   #Request Leave
    class Meta:
        model = LeaveRequest
        exclude = ("cancel_reason", "status")
    
    def valid(self, raise_exception=True):
        print(self._kwargs["data"])
        return True
        #if self._kwargs["data"][""]
     