# beehive_metrics/csv_exporter.py

import csv
from django.http import HttpResponse
from .models import BeehiveMetrics

def generate_csv_response(beehive_id):
    metrics = BeehiveMetrics.objects.filter(beehive_id=beehive_id)
    if not metrics.exists():
        return HttpResponse("Beehive metrics not found", status=404)

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = f'attachment; filename="beehive-metrics-{beehive_id}.csv"'

    writer = csv.writer(response)
    writer.writerow(['Created At', 'Temperature', 'Humidity', 'CO2', 'Weight'])

    for metric in metrics:
        writer.writerow([
            metric.created_at,
            metric.Temperature,
            metric.Humidity,
            metric.CO2,
            metric.Weight,
        ])

    return response
