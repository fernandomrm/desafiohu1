import React, { PropTypes, Component } from 'react'


export class Header extends Component {
    render() {
        return (
            <header>
                <i className="icon-hoteis" />
                <h1>HOTÉIS</h1>
            </header>
        )
    }
}


export class TabelaHoteisDisponiveis extends Component {
    renderHoteis() {
        const { hoteisDisponiveis } = this.props;
        if (hoteisDisponiveis.length) {
            return hoteisDisponiveis.map((hotel, index) =>
                <tr key={index}>
                    <td>{hotel.nome}</td>
                    <td>{hotel.cidade}</td>
                </tr>
            )
        } else {
            return <tr><td colSpan="2">Nenhum hotel encontrado</td></tr>;
        }
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Hotel</th>
                        <th>Cidade</th>
                    </tr>
                </thead>
                <tbody>
                    { this.renderHoteis() }
                </tbody>
            </table>
        )
    }
}

TabelaHoteisDisponiveis.propTypes = {
    hoteisDisponiveis: PropTypes.array.isRequired
}

export class FormBuscaHoteisDisponiveis extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            data_inicio: '',
            data_fim: '',
            desahabilitaIntervalo: false,
        }
        this.bindValue = this.bindValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    bindValue(e) {
        var newState = {};
        var value = e.target.value
        if (e.target.type == 'checkbox') {
            value = e.target.checked;
        }
        newState[e.target.name] = value;
        this.setState(newState);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { query, data_inicio, data_fim } = this.state;
        this.props.buscaHoteisDisponiveis(query, data_inicio, data_fim);
    }

    render() {
        const { query, data_inicio, data_fim, desahabilitaIntervalo } = this.state;
        return (
            <form ref="form" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-xs-12 col-sm-5">
                        <label>Quer ficar onde?</label>
                        <input type="text" name="query" value={query} />
                    </div>
                    <div className="col-sm-7">
                        <label>Quando? (entrada e saída)</label>
                        <div className="row">
                            <div className="col-sm-7">
                                <input
                                    ref="data_inicio"
                                    type="date"
                                    name="data_inicio"
                                    value={data_inicio}
                                    onChange={this.bindValue}
                                    readOnly={desahabilitaIntervalo}
                                />
                            </div>
                            <div className="col-sm-7">
                                <input
                                    ref="data_fim"
                                    type="date"
                                    name="data_fim"
                                    value={data_fim}
                                    onChange={this.bindValue}
                                    readOnly={desahabilitaIntervalo}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <label>
                            <input ref='checkbox' type="checkbox" name="desahabilitaIntervalo" onChange={this.bindValue} />
                            Ainda não defini as datas
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <button type="submit" className="btn">
                            Buscar
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

FormBuscaHoteisDisponiveis.propTypes = {
    buscaHoteisDisponiveis: PropTypes.func.isRequired
}
