from .models import ProductsModel, NutrientsModel
from .serializers import ProductSerializer, NutrientSerializer, UserSerializer
from django.shortcuts import render
from django.http import Http404, HttpResponse, JsonResponse
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
import io
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import mixins, generics, permissions, viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination, CursorPagination, PageNumberPagination
from django.views.decorators.csrf import csrf_exempt
from django.contrib import admin
admin.autodiscover()

# Create your views here.

#Function Based View
def add(request):
    if request.method=='POST':
        category = request.POST['category']
        name = request.POST['name']
        print(category, name)
        obj = ProductsModel()
        obj.category = category
        obj.name = name
        obj.save()
    return render(request, 'index.html')

def show(request):
    product = ProductsModel.objects.all()
    return render(request, 'output.html', {'data':product})

@api_view(['GET'])
def get(request):
    if request.method == 'GET':
        product = ProductsModel.objects.all()
        serializer = ProductSerializer(product,many=True)
        return Response(serializer.data, status=200)
        #return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def post(request):
    if request.method == 'POST':
        products = ProductSerializer(data = request.data)
        if products.is_valid():
            products.save()
            return Response(products.data, status=201)
        else:     
            return render(request, "index.html", {"data":products})
    return render(request, "index.html")             

#Class Based View
class ProductList(APIView):

    def get(self, request, format=None):        
        product = ProductsModel.objects.all()
        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data, status=200)

    def post(self, request, format=None):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors)         
    
#Using Mixin
class ProductListMixin(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = ProductsModel.objects.all()
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination
    #filter_backends = [DjangoFilterBackend]
    #filterset_fields = ['category']
    #filter_backends = [filters.SearchFilter]
    #search_fields = ['category']
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['category', 'nutrients']

    def get(self, request, *args, **kwargs):   
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs) 

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

#Using Generic Class Based Views
class ProductListGeneric(generics.ListCreateAPIView):
    queryset = ProductsModel.objects.all()
    serializer_class = ProductSerializer
    pagination_class = PageNumberPagination

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ProductDetailGeneric(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductsModel.objects.all()
    serializer_class = ProductSerializer 

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer           

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer 
    
#Using Viewsets
class ProductViewSet(viewsets.ModelViewSet):
    queryset = ProductsModel.objects.all()
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination
    
class NutrientViewset(viewsets.ModelViewSet):
    queryset = NutrientsModel.objects.all()
    serializer_class = NutrientSerializer

'''
class ProductSeri(object):
    def __init__(self, category, name):
        self.category = category
        self.name = name

obj1 = ProductSeri(category='vegetable', name='brinjal')
serializer = ProductSerializer(obj1)
#print(serializer.data)

json = JSONRenderer().render(serializer.data)     #serialization
print(json)

stream = io.BytesIO(json)
data = JSONParser().parse(stream)                 #deserialization
print(data)'''
