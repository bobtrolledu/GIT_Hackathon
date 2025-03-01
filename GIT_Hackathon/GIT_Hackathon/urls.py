from django.contrib import admin

# add include to the path
from django.urls import path, include
from Welcome_Home import views
# import views from todo
# import routers from the REST framework
# it is necessary for routing
from rest_framework import routers

# create a router object
router = routers.DefaultRouter()

# register the router
router.register(r'visibleMinorityData',views.visibleMinorityView, 'visibleMinorityData')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]
