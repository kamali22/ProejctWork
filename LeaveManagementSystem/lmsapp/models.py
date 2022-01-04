import django
from django.db import models
from django.contrib.auth.models import User 
import datetime

LEAVE_TYPE=(
    ('Personal leave','Personal Leave'),
    ('Carry forward','Carry Forward'),
    ('Compensatory leave', 'Compensatory Leave'),
)

class LeaveRequest(models.Model):
    emp_name = models.ForeignKey(User, on_delete=models.CASCADE)
    leave_reason = models.CharField(max_length=100)
    leave_type = models.CharField(max_length=20, choices=LEAVE_TYPE)
    from_date = models.DateTimeField(default=datetime.datetime.now)
    to_date = models.DateTimeField(default=datetime.datetime.now)
    no_of_days = models.IntegerField()
    cancel_reason = models.CharField(max_length=100)
    manager_name = models.CharField(max_length=50)
    status = models.CharField(max_length=100, default='requested')