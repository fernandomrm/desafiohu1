from django.conf.urls import url

from .views import BuscaHoteisView, BuscaHoteisDisponiveisView

urlpatterns = [
    url(r'^busca-hoteis/$', BuscaHoteisView.as_view(), name='busca_hoteis'),
    url(r'^busca-hoteis-disponiveis/$', BuscaHoteisDisponiveisView.as_view(), name='busca_hoteis_disponiveis'),
]
