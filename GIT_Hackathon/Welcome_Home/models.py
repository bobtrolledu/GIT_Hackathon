from django.db import models

# Create your models here.
class visibleMinority(models.Model):
    Neighbourhood = models.CharField(max_length=200, unique=True)
    NeighbourhoodId = models.IntegerField()
    Black = models.IntegerField()
    Chinese = models.IntegerField()
    SouthAsian = models.IntegerField()
    Filipino = models.IntegerField()
    LatinAmerican = models.IntegerField()
    SoutheastAsian = models.IntegerField()
    Arab = models.IntegerField()
    WestAsian = models.IntegerField()
    Korean = models.IntegerField()
    Japanese = models.IntegerField()

    def __str__(self):
        return self.Neighbourhood


class nativeLanguage(models.Model):
    Neighbourhood = models.CharField(max_length=200, unique=True)
    NeighbourhoodId = models.IntegerField()
    Language_French = models.IntegerField()
    Language_Chinese = models.IntegerField()
    Language_Tamil = models.IntegerField()
    Language_Italian = models.IntegerField()
    Language_Spanish = models.IntegerField()
    Language_Portuguese = models.IntegerField()
    Language_Tagalog = models.IntegerField()
    Language_Urdu = models.IntegerField()
    Language_Russian = models.IntegerField()
    Language_Farsi = models.IntegerField()
    Language_Korean = models.IntegerField()

    def __str__(self):
        return self.Neighbourhood

class ageDensity(models.Model):
    Neighbourhood = models.CharField(max_length=200, unique=True)
    NeighbourhoodId = models.IntegerField()
    Pop_0to4_years = models.IntegerField()
    Pop_5to9_years = models.IntegerField()
    Pop_10to14_years = models.IntegerField()
    Pop_15to19_years = models.IntegerField()
    Pop_20to24_years = models.IntegerField()
    Pop_25to29_years = models.IntegerField()
    Pop_30to34_years = models.IntegerField()
    Pop_35to39_years = models.IntegerField()
    Pop_40to44_years = models.IntegerField()
    Pop_45to49_years = models.IntegerField()
    Pop_50to54_years = models.IntegerField()
    Pop_55to59_years = models.IntegerField()
    Pop_60to64_years = models.IntegerField()
    Pop_65to69_years = models.IntegerField()
    Pop_70to74_years = models.IntegerField()
    Pop_75to79_years = models.IntegerField()
    Pop_80to84_years = models.IntegerField()
    Pop_85to89_years = models.IntegerField()
    Pop_90to94_years = models.IntegerField()
    Pop_95to99_years = models.IntegerField()

    def __str__(self):
        return self.Neighbourhood

class civics_equity(models.Model):
    Neighbourhood = models.CharField(max_length=200, unique=True)
    NeighbourhoodId = models.IntegerField()
    City_grant_funding = models.IntegerField()
    Neighbourhood_equity_score = models.IntegerField()
    Salvation_army_donors = models.IntegerField()
    Walk_score = models.IntegerField()
    Watermain_breaks = models.IntegerField()

    def __str__(self):
        return self.Neighbourhood

class economics(models.Model):
    Neighbourhood = models.CharField(max_length=200, unique=True)
    NeighbourhoodId = models.IntegerField()
    Business_licenses = models.IntegerField()
    Businesses = models.IntegerField()
    Local_employment = models.IntegerField()
    Social_assistance_recipients = models.IntegerField()

    def __str__(self):
        return self.Neighbourhood

class environment(models.Model):
    Neighbourhood = models.CharField(max_length=200, unique=True)
    NeighbourhoodId = models.IntegerField()
    Green_rebate_programs = models.IntegerField()
    Green_spaces = models.IntegerField()
    pollutant_carcinogenic_score = models.IntegerField()
    pollutant_noncarcinogenic_score = models.IntegerField()
    pollutant_release = models.IntegerField()
    tree_cover = models.IntegerField()

    def __str__(self):
        return self.Neighbourhood