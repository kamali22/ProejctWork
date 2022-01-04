from django.urls import path
from users import views

urlpatterns = [
    path('add/', views.list_user, name='homepage'),
    path('employee/', views.create_employee, name='employee'),
    path('manager/', views.create_manager, name='manager'),
    path('forget/', views.reset_password, name='forget password'),
]