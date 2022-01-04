from django.urls import path, include
from lmsapp import views

urlpatterns = [
    path('leave/', views.RequestLeave.as_view()),
    path('list/', views.LeaveRequestList.as_view()),
    path('history/', views.LeaveHistory.as_view()),
    path('approves/', views.approve_cancel),
    path('approved/<int:pk>/', views.approve, name='approve'),
    path('cancelled/<int:pk>/', views.cancel, name='cancel_reason'),
]    