from django.test import TestCase

from .models import Hotel


class BuscaHotelCidadeTestCase(TestCase):

    def setUp(self):
        hotel = Hotel.objects.create(cidade='Rio de Janeiro', nome='Hotel Urbano')

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
