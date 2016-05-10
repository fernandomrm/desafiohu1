import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux';

import './stylesheets/app.scss';

import { Header, FormBuscaHoteisDisponiveis, TabelaHoteisDisponiveis } from './components';
import { buscaHoteisDisponiveis, buscaHoteis } from './actions';


class App extends Component {
    render() {
        const { buscaHoteisDisponiveis, hoteisDisponiveis, hoteis, buscaHoteis } = this.props;
        return (
            <div className="container">
                <div className="container-busca">
                    <Header />
                    <p>+ 170.000 hotéis, pousadas e resorts no mundo todo.</p>
                    <FormBuscaHoteisDisponiveis
                        buscaHoteisDisponiveis={buscaHoteisDisponiveis}
                        hoteis={hoteis}
                        buscaHoteis={buscaHoteis}
                    />
                </div>
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
