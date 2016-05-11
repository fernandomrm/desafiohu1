import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import moment from 'moment';

import { Header, TabelaHoteisDisponiveis, FormBuscaHoteisDisponiveis, WidgetBusca } from '../src/components';

describe('Components', () => {
    describe('Header', () => {

        function setup() {
            let renderer = TestUtils.createRenderer();
            renderer.render(<Header />);
            let output = renderer.getRenderOutput();
            return output;
        }

        it('Renderiza header corretamente', () => {
            const output = setup();

            expect(output.type).toBe('header');

            let h1 = output.props.children;

            expect(h1.type).toBe('h1');
            expect(h1.props.children.length).toBe(2);
        })
    })

    describe('Tabela de hotéis disponíveis', () => {

        function setup(hoteis) {
            let renderer = TestUtils.createRenderer();
            renderer.render(<TabelaHoteisDisponiveis hoteisDisponiveis={hoteis} />);
            let output = renderer.getRenderOutput();
            return output;
        }

        it('Renderiza tabela de hotéis disponíveis vazia', () => {
            let hoteis = [];
            const output = setup(hoteis);

            expect(output.type).toBe('table');

            let [ thead, tbody ] = output.props.children;
            let td = tbody.props.children.props.children;

            expect(td.props.children).toBe('Nenhum hotel encontrado');
        })

        it('Renderiza tabela de hotéis disponíveis com resultados', () => {
            let hoteis = [{nome: 'Hotel Urbano', cidade: 'Rio de Janeiro'}, {nome: 'Outro Hotel', cidade: 'São Paulo'}];
            const output = setup(hoteis);

            expect(output.type).toBe('table');

            let [ thead, tbody ] = output.props.children;
            let rows = tbody.props.children;

            expect(rows.length).toBe(2);
        })
    })

    describe('Form de hotéis disponíveis', () => {

        function setup() {
            var func = () => null;
            let renderer = TestUtils.createRenderer();
            renderer.render(<FormBuscaHoteisDisponiveis buscaHoteisDisponiveis={func} hoteis={[]} buscaHoteis={func} />);
            let output = renderer.getRenderOutput();
            return output;
        }

        it('Renderiza form de busca por hotéis disponíveis corretamente', () => {
            const output = setup();

            expect(output.type).toBe('form');

            let rows = output.props.children;

            expect(rows.length).toBe(3);
        })

        it('Altera state quando a data de inicio é alterada', () => {
            let func = () => null;
            let componente = TestUtils.renderIntoDocument(
                <FormBuscaHoteisDisponiveis buscaHoteisDisponiveis={func} hoteis={[]} buscaHoteis={func} />
            );
            let data_inicio = componente.refs.data_inicio;
            const value = moment();
            data_inicio.props.onChange(value);

            expect(componente.state.dataInicio).toBe(value);
        })

        it('Altera state quando a data fim é alterada', () => {
            let func = () => null;
            let componente = TestUtils.renderIntoDocument(
                <FormBuscaHoteisDisponiveis buscaHoteisDisponiveis={func} hoteis={[]} buscaHoteis={func} />
            );
            let data_fim = componente.refs.data_fim;
            const value = moment();
            data_fim.props.onChange(value);

            expect(componente.state.dataFim).toBe(value);
        })

        it('Executa action buscaHoteisDisponiveis ao submeter formulário', () => {
            let func = expect.createSpy();
            let componente = TestUtils.renderIntoDocument(
                <FormBuscaHoteisDisponiveis buscaHoteisDisponiveis={func} hoteis={[]} buscaHoteis={func} />
            );
            TestUtils.Simulate.submit(componente.refs.form);

            expect(func.calls.length).toBe(1)
        })

        it('Altera state quando o Checkbox é clicado', () => {
            let func = () => null;
            let componente = TestUtils.renderIntoDocument(
                <FormBuscaHoteisDisponiveis buscaHoteisDisponiveis={func} hoteis={[]} buscaHoteis={func} />
            );
            let checkbox = componente.refs.checkbox;
            checkbox.checked = true;
            TestUtils.Simulate.change(checkbox);

            expect(componente.state.desahabilitaIntervalo).toBe(true);
        })

        it('Altera state quando o campo de hotel ou cidade é alterado', () => {
            let func = () => null;
            let componente = TestUtils.renderIntoDocument(
                <FormBuscaHoteisDisponiveis buscaHoteisDisponiveis={func} hoteis={[]} buscaHoteis={func} />
            );
            let query = componente.refs.query;
            const value = 'Hotel Urbano';
            query.props.onChange(value);

            expect(componente.state.query).toBe(value);
        })
    })

    describe('Widget de busca de hotéis e cidades', () => {

        function setup(buscaHoteis = () => null, onChange = () => null) {
            let componente = TestUtils.renderIntoDocument(
                <WidgetBusca hoteis={[]} buscaHoteis={buscaHoteis} onChange={onChange} />
            );
            return componente;
        }

        it('Renderiza widget de busca corretamente', () => {
            let func = () => null;
            let renderer = TestUtils.createRenderer();
            renderer.render(<WidgetBusca hoteis={[]} buscaHoteis={func} onChange={func} />);
            let output = renderer.getRenderOutput();

            expect(output.props.className).toBe('item-input-search');
        })

        it('Busca hotéis e cidades se a query tiver mais de 3 letras', () => {
            let buscaHoteis = expect.createSpy();
            let componente = setup(buscaHoteis);
            let search = componente.refs.input_search
            search.value = 'Hotel Urbano';
            TestUtils.Simulate.change(search)

            expect(buscaHoteis.calls.length).toBe(1)
        })

        it('Esconde resultados quando o campo de busca perde o foco', () => {
            let componente = setup();
            let search = componente.refs.input_search
            TestUtils.Simulate.blur(search)

            expect(componente.state.showResults).toBe(false);
        })

        it('Mostra resultado quando o campo de busca ganha foco', () => {
            let componente = setup();
            let search = componente.refs.input_search
            TestUtils.Simulate.focus(search)

            expect(componente.state.showResults).toBe(true);
        })

        it('Executa a property onChange ao selecionar um item da busca', () => {
            let onChange = expect.createSpy();
            let componente = setup(() => null, onChange);
            componente.handleClick('Hotel Urbano', {preventDefault: () => null});

            expect(onChange.calls.length).toBe(1)
        })
    })
})
