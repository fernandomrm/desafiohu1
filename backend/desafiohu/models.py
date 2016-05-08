from django.db import models


class HotelManager(models.Manager):

    def cria_amostra(self):
        cidades_e_hoteis = self.values_list('cidade', 'nome')
        cidades, hoteis = zip(*cidades_e_hoteis)
        return list(set(cidades)) + list(set(hoteis))


class Hotel(models.Model):
    nome = models.CharField(max_length=250)
    cidade = models.CharField(max_length=250)

    objects = HotelManager()


class Disponibilidade(models.Model):
    hotel = models.ForeignKey('Hotel')
    data = models.DateField()
    disponivel = models.BooleanField()
