from django.conf.urls import url

from .views import BuscaHoteisView

urlpatterns = [
    url(r'^busca-hoteis/$', BuscaHoteisView.as_view(), name='busca_hoteis'),
]
