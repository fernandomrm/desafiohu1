from datetime import date

from django.test import TestCase

from .models import Hotel, Disponibilidade


class BuscaHotelCidadeTestCase(TestCase):

    def setUp(self):
        Hotel.objects.create(cidade='Rio de Janeiro', nome='Hotel Urbano')

    def test_cria_amostra_de_pesquisa_de_hoteis_e_disponibilidades(self):
        amostra = Hotel.objects.cria_amostra()
        self.assertEquals(len(amostra), 2)

    def test_busca_por_cidade(self):
        query = 'Rio de Janeiro'
        resultado = Hotel.objects.busca(query)
        self.assertEquals(query, resultado[0])

    def test_busca_por_hotel(self):
        query = 'Hotel Urbano'
        resultado = Hotel.objects.busca(query)
        self.assertEquals(query, resultado[0])

    def test_busca_nao_retorna_resultados_menos_favoraveis(self):
        query = 'Rio de Janeiro'
        resultado = Hotel.objects.busca(query)
        self.assertNotIn('Hotel Urbano', resultado)

    def test_busca_query_com_acentos(self):
        query = 'ríó dé jánéíró'
        resultado = Hotel.objects.busca(query)
        self.assertIn('Rio de Janeiro', resultado)

    def test_busca_por_query_digitada_errada(self):
        query = 'Riu do Janero'
        resultado = Hotel.objects.busca(query)
        self.assertIn('Rio de Janeiro', resultado)

    def test_busca_por_query_digitada_fora_de_ordem(self):
        query = 'Urbano Hotel'
        resultado = Hotel.objects.busca(query)
        self.assertIn('Hotel Urbano', resultado)

    def test_busca_por_query_com_uma_palavra_incompleta(self):
        query = 'Hot'
        resultado = Hotel.objects.busca(query)
        self.assertIn('Hotel Urbano', resultado)


class BuscaHoteisDisponiveisTestCase(TestCase):

    def setUp(self):
        hotel = Hotel.objects.create(cidade='Rio de Janeiro', nome='Hotel Urbano')
        Disponibilidade.objects.create(hotel=hotel, data=date(2016, 1, 1), disponivel=True)
        Disponibilidade.objects.create(hotel=hotel, data=date(2016, 1, 2), disponivel=False)
        Disponibilidade.objects.create(hotel=hotel, data=date(2016, 1, 3), disponivel=True)
        Disponibilidade.objects.create(hotel=hotel, data=date(2016, 1, 4), disponivel=True)
        Disponibilidade.objects.create(hotel=hotel, data=date(2016, 1, 5), disponivel=True)

    def test_busca_hoteis_disponiveis_por_periodo(self):
        query = 'Hotel Urbano'
        data_inicio = date(2016, 1, 3)
        data_fim = date(2016, 1, 5)
        hoteis = Hotel.objects.busca_disponibilidade(query, data_inicio, data_fim)
        self.assertEquals(len(hoteis), 1)

    def test_busca_hoteis_disponiveis_sem_periodo_definido(self):
        query = 'Hotel Urbano'
        hoteis = Hotel.objects.busca_disponibilidade(query)
        self.assertEquals(len(hoteis), 1)
