Desafio de auto-complete e busca disponibilidade
=================================================

Este repositório contém tanto o backend quanto o frontend do desafio proposto. O desafio tem como problema, implementar um widget de busca de hotéis e cidades com auto-complete e uma busca por hotéis disponíveis em um período predefinido.

Dependências de sistema para executar o projeto: `node v4.4.4`, `python 3.4`, `virtualenv 15.0.1`

Setup do projeto:
-----------------------------------------------------------

Clonar repositório `git clone git@github.com:fernandomrm/desafiohu1.git`

Entrar no diretório do projeto criado `cd desafiohu1`

Instala dependências e constroi ambiente de desenvolvimento `make build`

Rodando projeto:
-----------------

Rodar backend(API) `make run-backend`

Servir frontend `make run-frontend`

Acessar: [localhost:8001](http://localhost:8001)

Rodando testes:
---------------

    make test

PEP8:
---------------

    make flake8
