from django.contrib import admin

# Register your models here.
from .models import Beehive, BeehiveMetrics

admin.site.register(Beehive)
admin.site.register(BeehiveMetrics)
