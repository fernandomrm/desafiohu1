import unicodedata

from django.db import models
from django.db.models import Q
from fuzzywuzzy import fuzz
from fuzzywuzzy import process


def lapida_extracao(extracao):
    if extracao:
        combinacoes, scorers = zip(*extracao)
        return list(combinacoes)
    return []

def normaliza_string(string):
    return ''.join(c for c in unicodedata.normalize('NFD', string) if unicodedata.category(c) != 'Mn')

def seleciona_scorer(query):
    if len(query.split(' ')) > 1:
        return fuzz.token_set_ratio
    return fuzz.partial_ratio


class HotelManager(models.Manager):

    def cria_amostra(self):
        cidades_e_hoteis = self.values_list('cidade', 'nome')
        cidades, hoteis = zip(*cidades_e_hoteis)
        return list(set(cidades)) + list(set(hoteis))

    def busca(self, query):
        query = normaliza_string(query)
        amostra = self.cria_amostra()
        scorer = seleciona_scorer(query)
        resultado = process.extractBests(query, amostra, limit=20, scorer=scorer, score_cutoff=60)
        if scorer == fuzz.token_set_ratio:
            resultado = process.extract(query, lapida_extracao(resultado), limit=20, scorer=fuzz.partial_ratio)
        return lapida_extracao(resultado)

    def busca_disponibilidade(self, query, data_inicio=None, data_fim=None):
        hoteis = self.filter(Q(nome__icontains=query) | Q(cidade__icontains=query))
        if data_inicio and data_fim:
            hoteis_disponiveis = []
            for hotel in hoteis:
                disponibilidades = Disponibilidade.objects.busca(hotel, data_inicio, data_fim)
                if disponibilidades and all(disponibilidades.values_list('disponivel', flat=True)):
                    hoteis_disponiveis.append(hotel)
            return hoteis_disponiveis
        return list(hoteis)


class Hotel(models.Model):
    nome = models.CharField(max_length=250)
    cidade = models.CharField(max_length=250)

    objects = HotelManager()


class DisponibilidadeManager(models.Manager):

    def busca(self, hotel, data_inicio, data_fim):
        return self.filter(hotel=hotel, data__gte=data_inicio, data__lte=data_fim)


class Disponibilidade(models.Model):
    hotel = models.ForeignKey('Hotel')
    data = models.DateField()
    disponivel = models.BooleanField()

    objects = DisponibilidadeManager()
