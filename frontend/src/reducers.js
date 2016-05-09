import { BUSCA_HOTEIS_SUCCESS } from './actions';

export function hoteis(state = [], action) {
    switch (action.type) {
        case BUSCA_HOTEIS_SUCCESS:
            return action.hoteis;
        default:
            return state
    }
}
