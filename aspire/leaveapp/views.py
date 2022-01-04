from leaveapp.models import LeaveRequests
from users.models import UsersProfile
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
    manager = UsersProfile.objects.get(user_id=id)
    manager_name = manager.manager_name
    if request.method == 'POST':
        if form.is_valid():
            form.save(id, manager_name)
            return redirect('/leavedetails')
        else:
            return render(request, 'leaveapp/leave_form.html', {'form':form, 'current_user':current_user, 'header':header,'manager_name':manager_name})
    else:
        return render(request, 'leaveapp/leave_form.html', {'form':form, 'current_user':current_user, 'header':header,'manager_name':manager_name})

@login_required(login_url='/splogin')
def approve_leave(request):
    header = 'Approve\Cancel Leave'
    form = LeaveApproveForm(request.POST)
    current_user = request.user
    value = LeaveRequests.objects.filter(status='requested', manager_name = current_user)
    return render(request, 'leaveapp/approve_form.html', {'form':form, 'value':value, 'current_user':current_user, 'header':header})

@login_required(login_url='/splogin')
def leave_details(request):
    header = 'Requested Leave'
    current_user = request.user
    id = request.user.id
    manager = UsersProfile.objects.get(user_id=id)
    manager_name = manager.manager_name
    approve = LeaveRequests.objects.filter(emp_name=request.user, status='requested') 
    return render(request, 'leaveapp/leave_details.html', {'approve':approve, 'current_user':current_user, 'header':header, 'manager_name':manager_name})

@login_required(login_url='/splogin')
def leave_status(request):
    header = 'Leave History'  
    current_user = request.user
    id = request.user.id
    manager = UsersProfile.objects.get(user_id=id)
    manager_name = manager.manager_name
    approve = LeaveRequests.objects.filter((Q(status='approved') | Q(status='cancelled')), emp_name=request.user) 
    return render(request, 'leaveapp/leavehistory.html', {'approve':approve, 'current_user':current_user, 'header':header, 'manager_name':manager_name})

@login_required(login_url='/splogin')
def update_employee(request):
    header = 'Update Profile'
    form = UpdateEmployeeForm(request.POST or None)
    current_user = request.user
    id = current_user.id
    value = UsersProfile.objects.get(user_id=current_user.id)
    if request.method == 'POST':
        if form.is_valid():
            form.save(id) 
            return redirect('/apply')
        else:
            return render(request, 'leaveapp/update_employee.html', {'form':form, 'value':value, 'current_user':current_user, 'header':header})    
    else:
        return render(request, 'leaveapp/update_employee.html', {'form':form, 'value':value, 'current_user':current_user, 'header':header})

@login_required(login_url='/splogin')
def update_manager(request):
    header = 'Update Profile'
    form = UpdateManagerForm(request.POST or None)
    current_user = request.user
    id = current_user.id
    value = UsersProfile.objects.get(user_id=current_user.id)
    if request.method == 'POST':
        if form.is_valid():
            form.save(id)
            return redirect('/approve')
        else:
            return render(request, 'leaveapp/update_manager.html', {'form':form, 'value':value, 'current_user':current_user, 'header':header})    
    else:
        return render(request, 'leaveapp/update_manager.html', {'form':form, 'value':value, 'current_user':current_user, 'header':header})

@login_required(login_url='/splogin')
def approve(request,pk):
    emp_user = LeaveRequests.objects.filter(id=pk).first()
    emp_user_count = LeaveRequests.objects.filter(emp_name_id=emp_user.emp_name_id, status='approved').aggregate(total=Sum('no_of_days'))
    emp_app = LeaveRequests.objects.get(id=pk)
    print(emp_user.emp_name)
    print(emp_app)
    print(emp_user_count)
    if emp_user_count['total'] == None:
        emp_user_count['total'] = 0
    print(emp_user_count)
    if not int(emp_user_count['total']) <= 5:
        print("INSIDE IF")
        emp_app.leave_type = "LOP"    
    emp_app.status = 'approved'
    emp_app.save()   
    return redirect('/approve')

@login_required(login_url='/splogin')
def cancel(request,pk):
    emp_app = LeaveRequests.objects.get(id=pk)
    emp_app.status = 'cancelled'
    emp_app.cancel_reason = request.GET.get('cancel_reason')
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
        return render(request,'leaveapp/login_form.html',{'form':form})

def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/splogin')