from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

# Create your views here.

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products,many = True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories,many = True)
    return JsonResponse(serializer.data,safe=False)