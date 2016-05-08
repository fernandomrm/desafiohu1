from django.http import JsonResponse
from django.views.generic import View

from .models import Hotel


class BuscaHoteisView(View):

    def get(self, request):
        query = request.GET.get('query')
        hoteis = Hotel.objects.busca(query)
        return JsonResponse(hoteis, safe=False)
