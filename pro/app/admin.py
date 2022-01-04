from django.contrib import admin
from .models import ProductsModel, NutrientsModel
# Register your models here.

admin.site.register(ProductsModel)
admin.site.register(NutrientsModel)