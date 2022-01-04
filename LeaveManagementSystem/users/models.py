from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    leave_days = models.CharField(max_length=20)
    gender = models.CharField(max_length=20)
    manager_name = models.CharField(max_length=50)
    domain = models.CharField(max_length=30)
    group = models.CharField(max_length=20)
    bio = models.CharField(max_length=1000) 