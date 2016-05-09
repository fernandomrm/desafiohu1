import expect from 'expect'
import { hoteis, hoteisDisponiveis } from '../src/reducers'
import { BUSCA_HOTEIS_SUCCESS, BUSCA_HOTEIS_DISPONIVEIS_SUCCESS } from '../src/actions';

describe('Reducers', () => {
    it('Reducer de hotéis retorna uma lista vazia por padrão', () => {
        expect(hoteis(undefined, {})).toEqual([]);
    })

    it('Reducer de hotéis altera estado com a action BUSCA_HOTEIS_SUCCESS', () => {
        var _hoteis = ['Hotel Urbano'];
        expect(
            hoteis([], {
                type: BUSCA_HOTEIS_SUCCESS,
                hoteis: _hoteis
            })
        ).toEqual(_hoteis);
    })

    it('Reducer de hotéis disponíveis retorna uma lista vazia por padrão', () => {
        expect(hoteisDisponiveis(undefined, {})).toEqual([]);
    })

    it('Reducer de hotéis disponíveis altera estado com a action BUSCA_HOTEIS_DISPONIVEIS_SUCCESS', () => {
        var _hoteis = [{id: 1, nome: 'Hotel Urbano', cidade: 'Rio de Janeiro'}];
        expect(
            hoteisDisponiveis([], {
                type: BUSCA_HOTEIS_DISPONIVEIS_SUCCESS,
                hoteisDisponiveis: _hoteis
            })
        ).toEqual(_hoteis);
    })
})
