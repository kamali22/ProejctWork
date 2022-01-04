from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class ProductsModel(models.Model):
    category = models.CharField(max_length=20)
    name = models.CharField(max_length=30)  
    owner = models.ForeignKey('auth.user', related_name='products', on_delete=models.CASCADE, default=1)  

class NutrientsModel(models.Model):
    vitamin = models.CharField(max_length=5)
    acid = models.CharField(max_length=40)  
    base = models.ForeignKey(ProductsModel, related_name="nutrients", on_delete=models.CASCADE)    
