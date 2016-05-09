import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import { Header } from '../src/components';

describe('Components', () => {
    describe('Header', () => {

        function setup() {
            let renderer = TestUtils.createRenderer()
            renderer.render(<Header />)
            let output = renderer.getRenderOutput()

            return {
                output,
                renderer
            }
        }

        it('Renderiza header corretamente', () => {
            const { output } = setup()

            expect(output.type).toBe('header')

            let [ icone, h1 ] = output.props.children

            expect(icone.type).toBe('i');
            expect(icone.props.className).toBe('icon-hoteis');
            expect(h1.type).toBe('h1');
            expect(h1.props.children).toBe('HOTÉIS');
        })
    })
})
