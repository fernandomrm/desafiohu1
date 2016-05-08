from django.db import models


class Hotel(models.Model):
    nome = models.CharField(max_length=250)
    cidade = models.CharField(max_length=250)


class Disponibilidade(models.Model):
    hotel = models.ForeignKey('Hotel')
    data = models.DateField()
    disponivel = models.BooleanField()
