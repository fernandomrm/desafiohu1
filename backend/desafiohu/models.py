import unicodedata

from django.db import models
from fuzzywuzzy import fuzz
from fuzzywuzzy import process


def lapida_extracao(extracao):
    if extracao:
        combinacoes, scorers = zip(*extracao)
        return list(combinacoes)
    return []

def normaliza_string(string):
    return ''.join(c for c in unicodedata.normalize('NFD', string) if unicodedata.category(c) != 'Mn')


class HotelManager(models.Manager):

    def cria_amostra(self):
        cidades_e_hoteis = self.values_list('cidade', 'nome')
        cidades, hoteis = zip(*cidades_e_hoteis)
        return list(set(cidades)) + list(set(hoteis))

    def busca(self, termo):
        termo = normaliza_string(termo)
        amostra = self.cria_amostra()
        resultado = process.extractBests(termo, amostra, limit=20, scorer=fuzz.token_set_ratio, score_cutoff=80)
        resultado_ordenado = process.extract(termo, lapida_extracao(resultado), limit=20, scorer=fuzz.partial_ratio)
        return lapida_extracao(resultado_ordenado)


class Hotel(models.Model):
    nome = models.CharField(max_length=250)
    cidade = models.CharField(max_length=250)

    objects = HotelManager()


class Disponibilidade(models.Model):
    hotel = models.ForeignKey('Hotel')
    data = models.DateField()
    disponivel = models.BooleanField()
