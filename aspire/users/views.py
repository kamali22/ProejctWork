from django.shortcuts import render, redirect
from .models import UsersProfile
from .forms import EmployeeCreationForm, ManagerCreationForm, PasswordResetForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

# Create your views here.

@login_required(login_url='/splogin')
def list_user(request):
    current_user = request.user
    values = UsersProfile.objects.all()
    user = User.objects.all()
    return render(request, 'homepage.html', {'current_user':current_user, 'data':values, 'user':user})

@login_required(login_url='/splogin')
def create_employee(request):
    form = EmployeeCreationForm(request.POST or None)    
    if request.method == 'POST':
        if form.is_valid():
            form.save()   
            return redirect('/add')
        else:
            return render(request, 'employee.html', {'form':form})  
    else:
        return render(request, 'employee.html', {'form':form})

@login_required(login_url='/splogin')
def create_manager(request):
    form = ManagerCreationForm(request.POST or None)
    if request.method == 'POST':
        if form.is_valid():
           form.save()  
           return redirect('/add')
        else: 
            return render(request, 'manager.html', {'form':form})          
    else:
        return render(request, 'manager.html', {'form':form})
 
def reset_password(request):   
    form = PasswordResetForm(request.POST or None)
    if request.method == 'POST':
        if form.is_valid():     
           form.save()  
           return redirect('/splogin')
        else:          
           return render(request, 'passwordreset.html', {'form':form})     
    else:
        return render(request, 'passwordreset.html', {'form':form})