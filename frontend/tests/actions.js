import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';

import { buscaHoteis, BUSCA_HOTEIS_SUCCESS, BUSCA_HOTEIS_REQUEST } from '../src/actions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('Cria action BUSCA_HOTEIS_SUCCESS ao concluir a busca de hóteis com sucesso', () => {
        var hoteis = ['Hotel Urbano'];

        nock('http://localhost:8000/')
        .get('/busca-hoteis')
        .reply(200, hoteis);

        const expectedActions = [
            { type: BUSCA_HOTEIS_REQUEST },
            { type: BUSCA_HOTEIS_SUCCESS, hoteis: hoteis }
        ];
        const store = mockStore({ hoteis: [] });

        return store.dispatch(buscaHoteis('Hotel Urbano'))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            });
    })
})
