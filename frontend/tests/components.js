import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import { Header, TabelaHoteisDisponiveis, FormBuscaHoteisDisponiveis } from '../src/components';

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

            let [ icone, h1 ] = output.props.children;

            expect(icone.type).toBe('i');
            expect(icone.props.className).toBe('icon-hoteis');
            expect(h1.type).toBe('h1');
            expect(h1.props.children).toBe('HOTÉIS');
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
            let renderer = TestUtils.createRenderer();
            renderer.render(<FormBuscaHoteisDisponiveis />);
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
            let componente = TestUtils.renderIntoDocument(<FormBuscaHoteisDisponiveis />);
            let data_inicio = componente.refs.data_inicio;
            const value = '3/1/2016';
            data_inicio.value = value;
            TestUtils.Simulate.change(data_inicio);

            expect(componente.state.data_inicio).toBe(value);
        })

        it('Altera state quando a data fim é alterada', () => {
            let componente = TestUtils.renderIntoDocument(<FormBuscaHoteisDisponiveis />);
            let data_fim = componente.refs.data_fim;
            const value = '5/1/2016';
            data_fim.value = value;
            TestUtils.Simulate.change(data_fim);

            expect(componente.state.data_fim).toBe(value);
        })
    })
})
