from django.test import TestCase

from .models import Hotel


class BuscaHotelCidadeTestCase(TestCase):

    def setUp(self):
        hotel = Hotel.objects.create(cidade='Rio de Janeiro', nome='Hotel Urbano')

    def test_cria_amostra_de_pesquisa_de_hoteis_e_disponibilidades(self):
        amostra = Hotel.objects.cria_amostra()
        self.assertEquals(len(amostra), 2)

    def test_busca_por_cidade(self):
        termo = 'Rio de Janeiro'
        resultado = Hotel.objects.busca(termo)
        self.assertEquals(termo, resultado[0])

    def test_busca_por_hotel(self):
        termo = 'Hotel Urbano'
        resultado = Hotel.objects.busca(termo)
        self.assertEquals(termo, resultado[0])

    def test_busca_nao_retorna_resultados_menos_favoraveis(self):
        termo = 'Rio de Janeiro'
        resultado = Hotel.objects.busca(termo)
        self.assertNotIn('Hotel Urbano', resultado)
