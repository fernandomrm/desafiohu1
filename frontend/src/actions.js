import $ from 'jquery';

export const BUSCA_HOTEIS_REQUEST = 'BUSCA_HOTEIS_REQUEST';
export const BUSCA_HOTEIS_SUCCESS = 'BUSCA_HOTEIS_SUCCESS';
export const BUSCA_HOTEIS_DISPONIVEIS_REQUEST = 'BUSCA_HOTEIS_DISPONIVEIS_REQUEST';
export const BUSCA_HOTEIS_DISPONIVEIS_SUCCESS = 'BUSCA_HOTEIS_DISPONIVEIS_SUCCESS';

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

export function buscaHoteis(query, successCallback = () => null) {
    return dispatch => {
        dispatch(buscaHoteisRequest());
        return $.ajax('http://localhost:8000/busca-hoteis/', {
            'data': {query: query},
            'method': 'GET',
            contentType: 'application/json; charset=utf-8',
            success: (json) => {
                dispatch(buscaHoteisSuccess(json))
                successCallback();
            }
        });
    }
}

function buscaHoteisDisponiveisRequest() {
    return {
        type: BUSCA_HOTEIS_DISPONIVEIS_REQUEST
    }
}

function buscaHoteisDisponiveisSuccess(hoteisDisponiveis) {
    return {
        type: BUSCA_HOTEIS_DISPONIVEIS_SUCCESS,
        hoteisDisponiveis
    }
}

export function buscaHoteisDisponiveis(query, dataInicio='', dataFim='') {
    return dispatch => {
        let data = {query: query, data_inicio: dataInicio, data_fim: dataFim};
        dispatch(buscaHoteisDisponiveisRequest());
        return $.ajax('http://localhost:8000/busca-hoteis-disponiveis/', {
            'data': data,
            'method': 'GET',
            contentType: 'application/json; charset=utf-8',
            success: (json) => {
                dispatch(buscaHoteisDisponiveisSuccess(json))
            }
        });
    }
}
