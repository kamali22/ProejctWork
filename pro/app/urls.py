from django.urls import path, include
from app import views
from rest_framework.routers import DefaultRouter
#from app.views import ProductViewSet

router = DefaultRouter()
router.register("ProductsModel", views.ProductViewSet)
router.register("NutrientsModel", views.NutrientViewset)

urlpatterns = [
    #path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('add/', views.add, name='add_data'),
    path('show/', views.show, name='show_data'),
    path('', include(router.urls)),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('get/', views.get, name='get_data'),
    path('post/', views.post, name='post_data'), 
    path('products/', views.ProductList.as_view(), name='class_based_view'),        
    path('products/mixin/', views.ProductListMixin.as_view(), name='mixin'), 
    path('products/generic/', views.ProductListGeneric.as_view(), name='generic'), 
    path('products/generics/<int:pk>/', views.ProductDetailGeneric.as_view(), name='generic')
]