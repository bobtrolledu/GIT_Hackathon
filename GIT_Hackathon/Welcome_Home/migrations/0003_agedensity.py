# Generated by Django 5.2b1 on 2025-03-01 09:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Welcome_Home', '0002_nativelanguage'),
    ]

    operations = [
        migrations.CreateModel(
            name='ageDensity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Neighbourhood', models.CharField(max_length=200, unique=True)),
                ('NeighbourhoodId', models.IntegerField()),
                ('Pop_0to4_years', models.IntegerField()),
                ('Pop_5to9_years', models.IntegerField()),
                ('Pop_10to14_years', models.IntegerField()),
                ('Pop_15to19_years', models.IntegerField()),
                ('Pop_20to24_years', models.IntegerField()),
                ('Pop_25to29_years', models.IntegerField()),
                ('Pop_30to34_years', models.IntegerField()),
                ('Pop_35to39_years', models.IntegerField()),
                ('Pop_40to44_years', models.IntegerField()),
                ('Pop_45to49_years', models.IntegerField()),
                ('Pop_50to54_years', models.IntegerField()),
                ('Pop_55to59_years', models.IntegerField()),
                ('Pop_60to64_years', models.IntegerField()),
                ('Pop_65to69_years', models.IntegerField()),
                ('Pop_70to74_years', models.IntegerField()),
                ('Pop_75to79_years', models.IntegerField()),
                ('Pop_80to84_years', models.IntegerField()),
                ('Pop_85to89_years', models.IntegerField()),
                ('Pop_90to94_years', models.IntegerField()),
                ('Pop_95to99_years', models.IntegerField()),
            ],
        ),
    ]
