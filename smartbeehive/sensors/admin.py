from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Beehive, BeehiveMetrics

# Register your models
admin.site.register(Beehive)
admin.site.register(BeehiveMetrics)
