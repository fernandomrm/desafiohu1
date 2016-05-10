import React, { PropTypes, Component } from 'react'
import throttle from 'underscore';


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
        this.selectHotel = this.selectHotel.bind(this);
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

    selectHotel(hotel) {
        this.setState({query: hotel});
    }

    render() {
        const { query, data_inicio, data_fim, desahabilitaIntervalo } = this.state;
        const { hoteis, buscaHoteis } = this.props;
        return (
            <form ref="form" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-xs-12 col-sm-5">
                        <label>Quer ficar onde?</label>
                        <WidgetBusca hoteis={hoteis} buscaHoteis={buscaHoteis} onChange={this.selectHotel} />
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
    buscaHoteisDisponiveis: PropTypes.func.isRequired,
    hoteis: PropTypes.array.isRequired,
    buscaHoteis: PropTypes.func.isRequired
}

class WidgetBusca extends Component {
    constructor() {
        super();
        this.state = {query: '', showResults: false, loading: false};
        this.searchItems = throttle(this.searchItems, 1000).bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    searchItems(e) {
        const { buscaHoteis } = this.props;
        var query = e.target.value;
        this.setState({query: query, loading: true});
        if (query.length > 2) {
            buscaHoteis(query, () =>
                this.setState({showResults: true, loading: false})
            );
        } else {
            this.setState({showResults: false, loading: false});
        }
        this.props.onChange(query);
    }

    handleClick(query, e) {
        e.preventDefault();
        this.props.onChange(query);
        this.setState({query: query, showResults: false});
    }

    renderResults() {
        const { query, showResults } = this.state;
        const { hoteis } = this.props;
        if (showResults && hoteis.length) {
            return (
                <div className="typeahead-result">
                    <ul className="typeahead-list list-block">
                        {hoteis.map((hotel, index) =>
                            <li key={index} onMouseDown={this.handleClick.bind(this, hotel)}>
                                <a href="#">{hotel}</a>
                            </li>
                        )}
                    </ul>
                </div>
            );
        }
        return;
    }

    handleBlur() {
        this.setState({showResults: false});
    }

    handleFocus() {
        this.setState({showResults: true});
    }

    render() {
        const { query, showResults, loading } = this.state;
        var listDisplay = 'typeahead-list ' + (showResults ? 'list-block' : 'list-none');

        return (
            <div className="item-input-search">
                <div className="typeahead-container">
                    <div className="typeahead-field">
                        <span className="typeahead-query">
                            <input
                                className={loading ? 'loading' : ''}
                                type="search"
                                placeholder="cidade ou hotel"
                                onChange={this.searchItems}
                                value={query}
                                onBlur={this.handleBlur}
                                required={true}
                                onFocus={this.handleFocus}
                            />
                            <input type="hidden" />
                        </span>
                    </div>
                    {this.renderResults()}
                </div>
            </div>
        )
    }
}

WidgetBusca.propTypes = {
    hoteis: PropTypes.array.isRequired,
    buscaHoteis: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
}
