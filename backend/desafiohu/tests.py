from django.test import TestCase

from .models import Hotel


class BuscaHotelCidadeTestCase(TestCase):

    def setUp(self):
        hotel = Hotel.objects.create(cidade='Rio de Janeiro', nome='Hotel Urbano')

    def test_cria_amostra_de_pesquisa_de_hoteis_e_disponibilidades(self):
        amostra = Hotel.objects.cria_amostra()
        self.assertEquals(len(amostra), 2)
