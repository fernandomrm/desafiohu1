import { fetch } from  'whatwg-fetch';

export const BUSCA_HOTEIS_REQUEST = 'BUSCA_HOTEIS_REQUEST';
export const BUSCA_HOTEIS_SUCCESS = 'BUSCA_HOTEIS_SUCCESS';

function buscaHoteisRequest() {
    return {
        type: BUSCA_HOTEIS_REQUEST
    }
}

function buscaHoteisSuccess(hoteis) {
    return {
        type: BUSCA_HOTEIS_SUCCESS,
        hoteis
    }
}

export function buscaHoteis(query) {
    return dispatch => {
        dispatch(buscaHoteisRequest());
        return fetch('http://localhost:8000/busca-hoteis', {query: query})
            .then(res => res.json())
            .then(json => dispatch(buscaHoteisSuccess(json)))
    }
}
