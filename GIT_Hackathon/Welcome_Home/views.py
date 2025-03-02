from django.shortcuts import render
from rest_framework import viewsets
from django.http import JsonResponse
from . import openAI_API
from .serializer import *
from .models import *

class visibleMinorityView(viewsets.ModelViewSet):
    
    serializer_class = visibleMinoritySerializer
    queryset = visibleMinority.objects.all()

def computeNeighbourhood(request):
    if request.method == 'GET':
        return openAI_API.compute_neighbourhoods(request.body)
