from django.urls import path
from . import views

urlpatterns = [
    path('api/', views.visibleMinorityView, name='visibleMinorityView'),
    path('api/compute_neighbourhood', views.computeNeighbourhood, name='computer_neighbourhood'),
    path('api/compute_description', views.computeDescription, name='compute_description'),
    path('api/getNeighbourhoodImg', views.getNeighbourhoodImg, name='getNeighbourhoodImg')
]