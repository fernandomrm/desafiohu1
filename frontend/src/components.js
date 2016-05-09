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
