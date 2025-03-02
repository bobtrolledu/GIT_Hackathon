from django.contrib import admin
from .models import *
# Register your models here.
class visibleMinorityAdmin(admin.ModelAdmin):
    list_display = ['Neighbourhood', 'NeighbourhoodId','Black', 'Chinese', 'SouthAsian', 'Filipino', 'LatinAmerican', 'SoutheastAsian', 'Arab', 'WestAsian', 'Korean', 'Japanese']

class nativeLanguageAdmin(admin.ModelAdmin):
    list_display = ['Neighbourhood', 'NeighbourhoodId', 'Language_French', 'Language_Chinese', 'Language_Tamil', 'Language_Italian', 'Language_Spanish', 'Language_Portuguese', 'Language_Tagalog', 'Language_Urdu', 'Language_Russian', 'Language_Farsi', 'Language_Korean']

class ageDensityAdmin(admin.ModelAdmin):
    list_display = ['Neighbourhood', 'NeighbourhoodId', 'Pop_0to4_years', 'Pop_5to9_years', 'Pop_10to14_years', 'Pop_15to19_years', 'Pop_20to24_years', 'Pop_25to29_years', 'Pop_30to34_years', 'Pop_35to39_years', 'Pop_40to44_years', 'Pop_45to49_years', 'Pop_50to54_years', 'Pop_55to59_years', 'Pop_60to64_years', 'Pop_65to69_years', 'Pop_70to74_years', 'Pop_75to79_years', 'Pop_80to84_years', 'Pop_85to89_years', 'Pop_90to94_years', 'Pop_95to99_years']

admin.site.register(visibleMinority,visibleMinorityAdmin)
admin.site.register(nativeLanguage,nativeLanguageAdmin)
admin.site.register(ageDensity,ageDensityAdmin)