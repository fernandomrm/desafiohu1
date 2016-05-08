from django.core.serializers.json import DjangoJSONEncoder


class HotelEncoder(DjangoJSONEncoder):
    def default(self, obj):
        return {'id': obj.id, 'nome': obj.nome, 'cidade': obj.cidade}
