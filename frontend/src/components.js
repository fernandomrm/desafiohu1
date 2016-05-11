import React, { PropTypes, Component } from 'react'
import throttle from 'underscore';
import DatePicker from 'react-datepicker';

import './stylesheets/header.scss';
import './stylesheets/widget-busca.scss';
import './stylesheets/form-search.scss';
import './stylesheets/table-hoteis.scss';
import 'react-datepicker/dist/react-datepicker.css';


export class Header extends Component {
    render() {
        return (
            <header>
                <h1>
                    <span className="fa-stack">
                        <i className="fa fa-circle-thin fa-stack-2x" />
                        <i className="fa fa-bed fa-stack-1x" />
                    </span>
                    HOTÉIS
                </h1>
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
            <table className="table table-hoteis">
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
            dataInicio: null,
            dataFim: null,
            desahabilitaIntervalo: false,
        }
        this.clickCheckbox = this.clickCheckbox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectHotel = this.selectHotel.bind(this);
        this.changeDataInicio = this.changeDataInicio.bind(this);
        this.changeDataFim = this.changeDataFim.bind(this);
    }

    clickCheckbox(e) {
        this.setState({desahabilitaIntervalo: e.target.checked});
    }

    changeDataInicio(data) {
        this.setState({dataInicio: data});
    }

    changeDataFim(data) {
        this.setState({dataFim: data});
    }

    handleSubmit(e) {
        e.preventDefault();
        var { query, dataInicio, dataFim, desahabilitaIntervalo } = this.state;
        if (desahabilitaIntervalo) {
            dataInicio = null;
            dataFim = null;
        } else {
            if (dataInicio) {
                dataInicio = dataInicio.format('YYYY-MM-DD');
            }
            if (dataFim) {
                dataFim = dataFim.format('YYYY-MM-DD');
            }
        }
        this.props.buscaHoteisDisponiveis(query, dataInicio, dataFim);
    }

    selectHotel(hotel) {
        this.setState({query: hotel});
    }

    render() {
        const { query, dataInicio, dataFim, desahabilitaIntervalo } = this.state;
        const { hoteis, buscaHoteis } = this.props;
        var minDate = null;
        if (dataInicio) {
            minDate = dataInicio.add(1, 'days');
        }
        return (
            <form ref="form" className="form-search" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-xs-12 col-sm-5">
                        <label>Quer ficar onde?</label>
                        <WidgetBusca ref="query" hoteis={hoteis} buscaHoteis={buscaHoteis} onChange={this.selectHotel} />
                    </div>
                    <div className="col-sm-7">
                        <label>Quando? (entrada e saída)</label>
                        <div className="row">
                            <div className="col-sm-6">
                                <DatePicker
                                    ref="data_inicio"
                                    selected={dataInicio}
                                    onChange={this.changeDataInicio}
                                    disabled={desahabilitaIntervalo}
                                    className="form-control"
                                    dateFormat="DD/MM/YYYY"
                                    placeholderText="Entrada"
                                />
                            </div>
                            <div className="col-sm-6">
                                <DatePicker
                                    ref="data_fim"
                                    selected={dataFim}
                                    onChange={this.changeDataFim}
                                    disabled={desahabilitaIntervalo}
                                    className="form-control"
                                    dateFormat="DD/MM/YYYY"
                                    placeholderText="Saída"
                                    minDate={minDate}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 checkbox">
                                <label>
                                    <input ref='checkbox' type="checkbox" onChange={this.clickCheckbox} />
                                    Ainda não defini as datas
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <button type="submit" className="btn btn-search">
                            <i className="fa fa-search" /> Buscar
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

export class WidgetBusca extends Component {
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
                                <a href="#"><i className="fa fa-map-marker" /> {hotel}</a>
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
        const { query, loading } = this.state;
        return (
            <div className="item-input-search">
                <div className="typeahead-container">
                    <div className="typeahead-field">
                        <span className="typeahead-query">
                            <input
                                ref='input_search'
                                className={loading ? 'loading' : ''}
                                type='search'
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
