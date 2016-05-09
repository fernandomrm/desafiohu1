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
            definir_intervalo: true,
        }
        this.bindValue = this.bindValue.bind(this);
    }

    bindValue(e) {
        var newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    render() {
        const { query, data_inicio, data_fim } = this.state;
        return (
            <form>
                <div className="row">
                    <div className="col-xs-12 col-sm-5">
                        <label>Quer ficar onde?</label>
                        <input type="text" name="query" value={query} />
                    </div>
                    <div className="col-sm-7">
                        <label>Quando? (entrada e saída)</label>
                        <div className="row">
                            <div className="col-sm-7">
                                <input ref="data_inicio" type="date" name="data_inicio" value={data_inicio} onChange={this.bindValue} />
                            </div>
                            <div className="col-sm-7">
                                <input ref="data_fim" type="date" name="data_fim" value={data_fim} onChange={this.bindValue} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <label>
                            <input type="checkbox" />
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
