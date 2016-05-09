import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';

import {
    buscaHoteis,
    BUSCA_HOTEIS_SUCCESS,
    BUSCA_HOTEIS_REQUEST,
    buscaHoteisDisponiveis,
    BUSCA_HOTEIS_DISPONIVEIS_SUCCESS,
    BUSCA_HOTEIS_DISPONIVEIS_REQUEST
 } from '../src/actions';


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

    it('Cria action BUSCA_HOTEIS_DISPONIVEIS_SUCCESS ao concluir a busca de hóteis disponíveis com sucesso', () => {
        var hoteis = [{id: 1, nome: 'Hotel Urbano', cidade: 'Rio de Janeiro'}];

        nock('http://localhost:8000/')
        .get('/busca-hoteis-disponiveis')
        .reply(200, hoteis);

        const expectedActions = [
            { type: BUSCA_HOTEIS_DISPONIVEIS_REQUEST },
            { type: BUSCA_HOTEIS_DISPONIVEIS_SUCCESS, hoteisDisponiveis: hoteis }
        ];
        const store = mockStore({ hoteisDisponiveis: [] });

        return store.dispatch(buscaHoteisDisponiveis('Hotel Urbano', '3/1/2016', '5/1/2016'))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            });
    })
})
