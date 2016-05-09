import expect from 'expect'
import { hoteis } from '../src/reducers'
import { BUSCA_HOTEIS_SUCCESS } from '../src/actions';

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
})
