from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .serializer import *
from .models import *
from rest_framework import viewsets
from .openAI_API import compute_neighbourhoods, compute_description
from .grabImage import returnImage


class visibleMinorityView(viewsets.ModelViewSet):
    serializer_class = visibleMinoritySerializer
    queryset = visibleMinority.objects.all()

@csrf_exempt
def computeNeighbourhood(request):
    if request.method == 'POST':  # <-- Accept POST instead of GET
        try:
            data = json.loads(request.body.decode('utf-8'))
            search_query = data.get("query", "")
            print("Received search query:", search_query)

            # Simulating a response
            response_data = compute_neighbourhoods(search_query)
            return JsonResponse(response_data, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"error": "Method Not Allowed"}, status=405)

@csrf_exempt
def computeDescription(request):
    if request.method == 'POST':  # <-- Accept POST instead of GET
        try:
            data = json.loads(request.body.decode('utf-8'))
            search_query = data.get("query", "")
            neighbourhood = data.get("neighbourhood", "")
            print("Received search query:", search_query)

            # Simulating a response
            response_data = compute_description(search_query, neighbourhood)
            return JsonResponse(response_data, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"error": "Method Not Allowed"}, status=405)

@csrf_exempt
def getNeighbourhoodImg(request):
    if request.method == 'POST':  # <-- Accept POST instead of GET
        try:
            data = json.loads(request.body.decode('utf-8'))
            search_query = data.get("query", "")
            print("Received search query:", search_query)

            # Simulating a response
            response_data = returnImage(search_query)
            return JsonResponse(response_data, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"error": "Method Not Allowed"}, status=405)


