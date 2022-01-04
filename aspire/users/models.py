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
    ('Rakesh','Rakesh'),
    ('Yasin','Yasin'),
    ('Jaya', 'Jaya'),
    ('Kannan', 'Kannan')
)
GROUP=(
    ('Employee','Employee'),
    ('Manager','Manager')
)

class UsersProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)    
    img = models.ImageField(upload_to='profiles', default='default.img', help_text='Upload image with size of 1MB')
    leave_days = models.CharField(max_length=20, choices=ELIGIBLE_LEAVE, default='0')
    gender = models.CharField(max_length=20, choices=GENDER)
    manager_name = models.CharField(max_length=50, choices=MANAGER, default='None')
    domain = models.CharField(max_length=30, default='Python')
    group = models.CharField(max_length=20, choices=GROUP, default='Admin')
    bio = models.CharField(max_length=1000)