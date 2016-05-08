# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-08 14:14
from __future__ import unicode_literals
import codecs
import sys
from datetime import datetime

from django.db import migrations


def importa_hoteis(apps, schema_editor):
    Hotel = apps.get_model('desafiohu', 'Hotel')
    doc = codecs.open('../artefatos/hoteis.txt', 'r', 'utf-8')
    linhas = doc.read().split('\n')
    doc.close()
    print('\nImportando hotéis\n')
    for linha in linhas:
        if not linha:
            continue
        id, cidade, nome = [i for i in linha.strip().split(',')]
        Hotel.objects.create(id=id, cidade=cidade, nome=nome)
        sys.stdout.write('.')
        sys.stdout.flush()
    print('\n')

def importa_disponibilidades(apps, schema_editor):
    Disponibilidade = apps.get_model('desafiohu', 'Disponibilidade')
    doc = codecs.open('../artefatos/disp.txt', 'r', 'utf-8')
    linhas = doc.read().split('\n')
    doc.close()
    print('Importando disponibilidades\n')
    for linha in linhas:
        if not linha:
            continue
        hotel, data, disponivel = [i for i in linha.strip().split(',')]
        disponivel = int(disponivel)
        data = datetime.strptime(data, '%d/%m/%Y').date()
        Disponibilidade.objects.create(hotel_id=hotel, data=data, disponivel=disponivel)
        sys.stdout.write('.')
        sys.stdout.flush()
    print('\n')

def realiza_impotacao(apps, schema_editor):
    importa_hoteis(apps, schema_editor)
    importa_disponibilidades(apps, schema_editor)


class Migration(migrations.Migration):

    dependencies = [
        ('desafiohu', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(realiza_impotacao),
    ]
