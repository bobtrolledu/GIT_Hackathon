from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .serializer import *
from .models import *
from rest_framework import viewsets
from .openAI_API import compute_neighbourhoods

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
            print(response_data)
            print(JsonResponse)
            return JsonResponse(response_data, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"error": "Method Not Allowed"}, status=405)

