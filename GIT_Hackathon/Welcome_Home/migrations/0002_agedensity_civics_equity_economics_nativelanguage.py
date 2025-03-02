# Generated by Django 5.1.6 on 2025-03-02 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Welcome_Home', '0001_initial'),
    ]

    operations = [

        migrations.CreateModel(
            name='economics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Neighbourhood', models.CharField(max_length=200, unique=True)),
                ('NeighbourhoodId', models.IntegerField()),
                ('Business_licenses', models.IntegerField()),
                ('Businesses', models.IntegerField()),
                ('Local_employment', models.IntegerField()),
                ('Social_assistance_recipients', models.IntegerField()),
            ],
        )

    ]
