from django.db import models
from django.contrib.auth.models import User
# Create your models here.
ELIGIBLE_LEAVE=(
    ('1','1'),
    ('2','2'),
    ('3','3'),
    ('4','4'),
    ('5','5')
)
GENDER=(
    ('Male','Male'),
    ('Female','Female')
)
MANAGER=(
    ('Yasin','Yasin'),
)
GROUP=(
    ('Employee','Employee'),
    ('Manager','Manager')
)

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)    
    leave_days = models.CharField(max_length=20, choices=ELIGIBLE_LEAVE, default='-')
    gender = models.CharField(max_length=20, choices=GENDER)
    manager_name = models.CharField(max_length=50, choices=MANAGER, default='-')
    domain = models.CharField(max_length=30)
    group = models.CharField(max_length=20, choices=GROUP, default='-')
    bio = models.CharField(max_length=1000)