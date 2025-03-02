from rest_framework import serializers
from .models import *

# create a serializer class
class visibleMinoritySerializer(serializers.ModelSerializer):

    # create a meta class
    class Meta:
        model = visibleMinority
        fields = ('Neighbourhood', 'NeighbourhoodId','Black', 'Chinese', 'SouthAsian', 'Filipino', 'LatinAmerican', 'SoutheastAsian', 'Arab', 'WestAsian', 'Korean', 'Japanese')