import { BUSCA_HOTEIS_SUCCESS, BUSCA_HOTEIS_DISPONIVEIS_SUCCESS } from './actions';

export function hoteis(state = [], action) {
    switch (action.type) {
        case BUSCA_HOTEIS_SUCCESS:
            return action.hoteis;
        default:
            return state
    }
}

export function hoteisDisponiveis(state = [], action) {
    switch (action.type) {
        case BUSCA_HOTEIS_DISPONIVEIS_SUCCESS:
            return action.hoteisDisponiveis;
        default:
            return state
    }
}
