import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux';

import { Header, FormBuscaHoteisDisponiveis, TabelaHoteisDisponiveis } from './components';
import { buscaHoteisDisponiveis, buscaHoteis } from './actions';


class App extends Component {
    render() {
        const { buscaHoteisDisponiveis, hoteisDisponiveis, hoteis, buscaHoteis } = this.props;
        return (
            <div>
                <Header />
                <FormBuscaHoteisDisponiveis
                    buscaHoteisDisponiveis={buscaHoteisDisponiveis}
                    hoteis={hoteis}
                    buscaHoteis={buscaHoteis}
                />
                <TabelaHoteisDisponiveis hoteisDisponiveis={hoteisDisponiveis} />
            </div>
        )
    }
}

App.propTypes = {
    hoteisDisponiveis: PropTypes.array.isRequired,
    buscaHoteisDisponiveis: PropTypes.func.isRequired,
    hoteis: PropTypes.array.isRequired,
    buscaHoteis: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        hoteisDisponiveis: state.hoteisDisponiveis,
        hoteis: state.hoteis
    };
}

function mapDispatchToProps(dispatch) {
    return {
        buscaHoteisDisponiveis: (query, dataInicio, dataFim) => {
            dispatch(buscaHoteisDisponiveis(query, dataInicio, dataFim))
        },
        buscaHoteis: (query, successCallback) => {
            dispatch(buscaHoteis(query, successCallback))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
