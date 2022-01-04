from django.contrib.auth.models import User
from django.http import request
from users.models import UsersProfile
from django import forms
from django.forms.widgets import DateInput
from .models import LeaveRequests
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext as a
import datetime

LEAVE_TYPE=(
    ('Personal leave','Personal Leave'),
    ('Carry forward','Carry Forward'),
    ('Compensatory leave', 'Compensatory Leave')
)

def date_validate(value):
    if not (value > datetime.date.today()):
        raise ValidationError(a("Enter the correct date!"))
    else:
        return True

class DateInput(forms.DateInput):
    input_type = 'date'

class LoginForm(forms.Form):
    username = forms.CharField(label='Username',max_length=20)
    password = forms.CharField(label='Password', widget=forms.PasswordInput())

class LeaveRequestForm(forms.Form):
    emp_name = forms.CharField(disabled=True, required=False)
    leave_reason = forms.CharField(max_length=100, label='Leave Reason', widget=forms.Textarea(attrs={'rows':2, 'cols':23}))
    leave_type = forms.ChoiceField(choices=LEAVE_TYPE, label='Leave Type')
    from_date = forms.DateField(widget=DateInput, validators=[date_validate])
    to_date = forms.DateField(widget=DateInput, validators=[date_validate])
    no_of_days = forms.IntegerField(max_value=10) 
    manager_name = forms.CharField(disabled=True, required=False)
 
    def save(self, pk, manager_name):
        emp_app = LeaveRequests.objects.create(leave_reason=self.cleaned_data['leave_reason'], leave_type=self.cleaned_data['leave_type'], from_date=self.cleaned_data['from_date'], to_date=self.cleaned_data['to_date'], no_of_days=self.cleaned_data['no_of_days'], status='requested', emp_name_id=pk, manager_name=manager_name)
        emp_app.save()

class LeaveApproveForm(forms.Form):
    status = forms.ChoiceField(choices=(('Approve','Approve'),('Cancel','Cancel')))
    manager_name = forms.CharField(max_length=20)
    cancel_reason = forms.CharField(max_length=120, required=False)  

class UpdateEmployeeForm(forms.Form):
    email = forms.EmailField(max_length=100, widget=forms.EmailInput(), required=False)   
    bio = forms.CharField(label='Bio', max_length=200, widget=forms.Textarea(attrs={'rows':2, 'cols':22}), required=False)

    def save(self, pk):
        user = User.objects.get(id=pk)
        user.email = self.cleaned_data['email']
        user.save()
        user_profile = UsersProfile.objects.get(user_id=pk)
        user_profile.bio = self.cleaned_data['bio']
        user_profile.save()

class UpdateManagerForm(forms.Form):
    email = forms.EmailField(max_length=100, widget=forms.EmailInput(), required=False)
    domain = forms.CharField(label='Domain', max_length=20, required=False)
    bio = forms.CharField(label='Bio', max_length=200, widget=forms.Textarea(attrs={'rows':2, 'cols':22}), required=False)

    def save(self, pk):
        user = User.objects.get(id=pk)
        user.email = self.cleaned_data['email']
        user.save()
        user_profile = UsersProfile.objects.get(user_id=pk)
        user_profile.bio = self.cleaned_data['bio']
        user_profile.domain = self.cleaned_data['domain']
        user_profile.save()