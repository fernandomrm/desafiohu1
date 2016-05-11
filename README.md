 Desafio de auto-complete e busca disponibilidade
=================================================

Este repositório contém tanto o backend quanto o frontend do desafio proposto. O desafio tem como problema, implementar um widget de busca de hotéis e cidades com auto-complete e uma busca por hotéis disponíveis em um período predefinido.

Inicialização do repositório e instalação das dependências:
-----------------------------------------------------------

    git clone git@github.com:fernandomrm/desafiohu1.git
    cd desafiohu1
    make build

Rodando backend:
----------------

    make run-backend # <--- Abrirá o servidor na porta 8000

Rodando frontend:
-----------------

    make run-frontend # <-- Abrirá o servidor na porta 8001

Rodando testes:
---------------

    make test

Dependências de sistema:
------------------------

    node v4.4.4
    python 3.4.3
    virtualenv 15.0.1
