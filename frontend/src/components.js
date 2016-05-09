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
    render() {
        return (
            <form>
                <div className="row">
                    <div className="col-xs-12 col-sm-5">
                        <label>Quer ficar onde?</label>
                        <input type="text" name="query" />
                    </div>
                    <div className="col-sm-7">
                        <label>Quando? (entrada e saída)</label>
                        <div className="row">
                            <div className="col-sm-7">
                                <input type="date" name="data_inicio" />
                            </div>
                            <div className="col-sm-7">
                                <input type="date" name="data_fim" />
                            </div>
                        </div>
                        <input type="text" name="query" />
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
