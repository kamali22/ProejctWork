from django.urls import path
from leaveapp import views

urlpatterns = [
    path('splogin/', views.user_login, name='login'),
    path('splogout/', views.logout_view, name='login'),
    path('approve/', views.approve_leave, name='approve'),
    path('apply/', views.request_leave, name='leave_request'), 
    path('updateemp/', views.update_employee, name='update_employee'),
    path('updateman/', views.update_manager, name='update_manager'),
    path('leavedetails/', views.leave_details, name='leavedetails'),
    path('leavehistory/', views.leave_status, name='leavestatus'),
    path('approved/<int:pk>/', views.approve, name='approve'),
    path('cancelled/<int:pk>/', views.cancel, name='cancel_reason'),
] 