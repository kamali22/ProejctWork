from rest_framework import serializers
from .models import ProductsModel, NutrientsModel
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(many=True, queryset=ProductsModel.objects.all())
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = User
        fields = ['id', 'username', 'products', 'owner']

class NutrientSerializer(serializers.ModelSerializer):
    class Meta:
        model = NutrientsModel
        fields = "__all__"

class ProductSerializer(serializers.Serializer):
    category = serializers.CharField(max_length=20)
    name = serializers.CharField(max_length=30)
    nutrients = NutrientSerializer(read_only=True, many=True)
    
    def create(self, validated_data):
        if self.validated_data['category']!=self.validated_data['name'] and self.validated_data['name'].isalpha():    #custom validation
            product = ProductsModel.objects.create(**validated_data) 
            product.save() 
            return product
        else:
            raise serializers.ValidationError("Invalid input!")