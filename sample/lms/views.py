from lms.models import LeaveRequest
from user.models import UserProfile
from django.shortcuts import redirect, render
from .forms import *
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponseRedirect
from django.db.models import Q, Sum
from django.contrib import messages
from django.contrib.auth.models import User
from django.core.mail import send_mail

@login_required(login_url='/splogin')
def request_leave(request):
    header = 'Apply Leave'
    form = LeaveRequestForm(request.POST or None)
    current_user = request.user
    id = request.user.id
    manager = UserProfile.objects.get(user_id=id)
    manager_name = manager.manager_name
    if request.method == 'POST':
        if form.is_valid():
            form.save(id, manager_name)
            return redirect('/leavedetails')
        else:
            return render(request, 'leave_form.html', {'form':form, 'current_user':current_user, 'header':header,'manager_name':manager_name})
    else:
        return render(request, 'leave_form.html', {'form':form, 'current_user':current_user, 'header':header,'manager_name':manager_name})

@login_required(login_url='/splogin')
def approve_leave(request):
    header = 'Approve\Cancel Leave'
    form = LeaveApproveForm(request.POST)
    current_user = request.user
    value = LeaveRequest.objects.filter(status='requested', manager_name = current_user)
    print(value)
    return render(request, 'approve_form.html', {'form':form, 'value':value, 'current_user':current_user, 'header':header})

@login_required(login_url='/splogin')
def leave_details(request):
    header = 'Requested Leave'
    current_user = request.user
    id = request.user.id
    manager = UserProfile.objects.get(user_id=id)
    manager_name = manager.manager_name
    approve = LeaveRequest.objects.filter(emp_name=request.user, status='requested') 
    return render(request, 'leave_details.html', {'approve':approve, 'current_user':current_user, 'header':header, 'manager_name':manager_name})

@login_required(login_url='/splogin')
def leave_status(request):
    header = 'Leave History'  
    current_user = request.user
    id = request.user.id
    manager = UserProfile.objects.get(user_id=id)
    manager_name = manager.manager_name
    approve = LeaveRequest.objects.filter((Q(status='approved') | Q(status='cancelled')), emp_name=request.user) 
    return render(request, 'leavehistory.html', {'approve':approve, 'current_user':current_user, 'header':header, 'manager_name':manager_name})

@login_required(login_url='/splogin')
def update_employee(request):
    header = 'Update Profile'
    form = UpdateEmployeeForm(request.POST or None)
    current_user = request.user
    id = current_user.id
    value = UserProfile.objects.get(user_id=current_user.id)
    if request.method == 'POST':
        if form.is_valid():
            form.save(id) 
            return redirect('/apply')
        else:
            return render(request, 'update_employee.html', {'form':form, 'value':value, 'current_user':current_user, 'header':header})    
    else:
        return render(request, 'update_employee.html', {'form':form, 'value':value, 'current_user':current_user, 'header':header})

@login_required(login_url='/splogin')
def update_manager(request):
    header = 'Update Profile'
    form = UpdateManagerForm(request.POST or None)
    current_user = request.user
    id = current_user.id
    value = UserProfile.objects.get(user_id=current_user.id)
    if request.method == 'POST':
        if form.is_valid():
            form.save(id)
            return redirect('/approve')
        else:
            return render(request, 'update_manager.html', {'form':form, 'value':value, 'current_user':current_user, 'header':header})    
    else:
        return render(request, 'update_manager.html', {'form':form, 'value':value, 'current_user':current_user, 'header':header})

@login_required(login_url='/splogin')
def approve(request,pk):
    monthly_salary = 25000
    emp_app = LeaveRequest.objects.get(emp_name_id=pk, status='requested', manager_name=request.user)
    emp_app.status = 'approved'
    user_app = UserProfile.objects.get(user_id = pk)
    user_app.leave_days = int(user_app.leave_days) - emp_app.no_of_days
    if user_app.leave_days < 0:
        lop = monthly_salary - (abs(user_app.leave_days) * 500)
        send_mail('Status of Your Leave Request', f'Your leave is approved by {emp_app.manager_name} and considered as Loss of Pay.', 'kamalirasi2017@gmail.com', ['kamalishwetha@gmail.com'], fail_silently=False,)
    else:
        send_mail('Status of Your Leave Request', f'Your leave is approved by {emp_app.manager_name}', 'kamalirasi2017@gmail.com', ['kamalishwetha@gmail.com'], fail_silently=False,)
    user_app.save()
    emp_app.save()   
    return redirect('/approve')

@login_required(login_url='/splogin')
def cancel(request,pk):
    print(pk, request.user, "hiiiiiiiiiiiiiiiii")
    emp_app = LeaveRequest.objects.get(emp_name_id=pk, status='requested', manager_name=request.user)
    emp_app.status = 'cancelled'
    emp_app.cancel_reason = request.GET.get('cancel_reason')
    send_mail('Status of Your Leave Request', f'Your leave is cancelled by {emp_app.manager_name}, because {emp_app.cancel_reason}', 'kamalirasi2017@gmail.com', ['kamalishwetha@gmail.com'], fail_silently=False,)
    emp_app.save()
    return redirect('/approve')

def user_login(request):
    form = LoginForm(request.POST)
    if request.method=='POST':
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username,password=password)
            if user is not None:
                login(request,user)
                if not user.is_superuser and user.is_staff: #Checking manager
                    return HttpResponseRedirect('/approve')
                elif not user.is_staff and user.is_active:  #Checking Employee
                    return HttpResponseRedirect('/apply')
                elif user.is_staff and user.is_superuser:   #Checking admin
                    return HttpResponseRedirect('/add')
            else:
                messages.error(request, "Invalid Login Credentials!")
                return redirect('/splogin')                          
    else:
        return render(request,'login_form.html',{'form':form})

def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/splogin')