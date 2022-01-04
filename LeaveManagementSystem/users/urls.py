from django.urls import path, include
from users import views

urlpatterns = [
    path('api-login/', views.LoginUser.as_view(), name='login'),
]  