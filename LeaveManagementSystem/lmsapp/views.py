from django.db.models import Q
from .models import LeaveRequest
from django.contrib import messages
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework import mixins, generics
from django.http import HttpResponseRedirect
from rest_framework.response import Response
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from rest_framework.renderers import TemplateHTMLRenderer
from django.contrib.auth.decorators import login_required
from rest_framework.pagination import LimitOffsetPagination
from .serializers import HistorySerializer, RequestSerializer, ListSerializer
from rest_framework.decorators import api_view, renderer_classes

#Request leave 
class RequestLeave(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    login_required = True
    queryset = LeaveRequest.objects.all()
    serializer_class = RequestSerializer
    pagination_class = LimitOffsetPagination
    
    def post(self, request):
        serializer = RequestSerializer(data = request.data)
        if serializer.is_valid():
            print(serializer.validated_data)
            serializer.valid()
            serializer.save()
        return Response(serializer.data)
    '''    
    def post(self, request, *args, **kwargs): 
        return self.create(request, *args, **kwargs)'''

#List of requested leave
class LeaveRequestList(mixins.ListModelMixin, generics.GenericAPIView):
    login_required = True
    queryset = LeaveRequest.objects.filter(status='requested')
    serializer_class = ListSerializer
    pagination_class = LimitOffsetPagination
    
    def get(self, request):
        #queryset = LeaveRequest.objects.filter(status='requested')
        queryset = self.get_queryset()
        serializer = ListSerializer(queryset, many=True)
        return Response(serializer.data)
    '''
    def get(self, request, *args, **kwargs):   
        return self.list(request, *args, **kwargs)'''

#List of approved/cancelled leave  #without using mixin and only with generic api
class LeaveHistory(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    login_required = True
    queryset = LeaveRequest.objects.filter(Q(status='approved') | Q(status='cancelled'))
    serializer_class = HistorySerializer
    pagination_class = LimitOffsetPagination
    
    def get(self, request):
        #queryset = LeaveRequest.objects.filter(status='requested')
        queryset = self.get_queryset()
        serializer = HistorySerializer(queryset, many=True)
        return Response(serializer.data)
    '''    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)'''
        
@login_required(login_url='/login')
def approve_cancel(request):
    serializer_class = ListSerializer()
    form = serializer_class
    value = LeaveRequest.objects.filter(status='requested')
    return render(request, 'approve_leave.html', {'form':form, 'value':value})

@login_required(login_url='/login')
def approve(request,pk):
    emp_app = LeaveRequest.objects.get(id=pk)
    emp_app.status = 'approved'
    send_mail('Leave Status', 'Your leave is approved', 'kamalirasi2017@gmail.com', ['kamalishwetha.com'], fail_silently=False,)
    emp_app.save()
    return redirect('/approves') 

@login_required(login_url='/login')
def cancel(request,pk):
    emp_app = LeaveRequest.objects.get(id=pk)
    emp_app.status = 'cancelled'
    send_mail('Leave Status', 'Your leave is cancelled', 'kamalirasi2017@gmail.com', ['kamalishwetha@gmail.com'], fail_silently=False,)
    emp_app.cancel_reason = request.GET.get('cancel_reason')
    emp_app.save()
    return redirect('/approves')    
       