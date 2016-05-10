import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import ConnectedApp, { App } from '../src/containers';


describe('Containers', () => {
    describe('App', () => {

        function setup() {
            let func = () => null;
            let renderer = TestUtils.createRenderer();
            renderer.render(<App hoteisDisponiveis={[]} buscaHoteisDisponiveis={func} hoteis={[]} buscaHoteis={func} />);
            let output = renderer.getRenderOutput();
            return output;
        }

        it('Renderiza app corretamente', () => {
            const output = setup();

            expect(output.props.className).toBe('container');
            expect(output.props.children.length).toBe(2);
        })
    })
})
