from datetime import datetime

from django.http import JsonResponse
from django.views.generic import View

from .models import Hotel
from .serializers import HotelEncoder


class BuscaHoteisView(View):

    def get(self, request):
        query = request.GET.get('query')
        hoteis = Hotel.objects.busca(query)
        return JsonResponse(hoteis, safe=False)


class BuscaHoteisDisponiveisView(View):

    def get(self, request):
        query = request.GET.get('query')
        data_inicio = None
        data_fim = None
        if request.GET.get('data_inicio'):
            data_inicio = datetime.strptime(request.GET.get('data_inicio'), '%Y-%m-%d').date()
        if request.GET.get('data_fim'):
            data_fim = datetime.strptime(request.GET.get('data_fim'), '%Y-%m-%d').date()
        hoteis = Hotel.objects.busca_disponibilidade(query, data_inicio, data_fim)
        return JsonResponse(hoteis, encoder=HotelEncoder, safe=False)
