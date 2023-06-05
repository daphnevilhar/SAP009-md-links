# Markdown Links

## Índice

* [1. Resumo do projeto](#1-resumo-do-projeto)
* [2. Intalação](#2-instalação)
* [3. CLI](#3-cli)
* [4. Ferramentas utilizadas](#4-ferramentas-utilizadas)

***

## 1. Resumo do projeto

O projeto Markdown Links se resume em uma ferramenta de linha de comando `(CLI)` que permite ao usuário executar uma biblioteca diretamente pelo terminal, onde é possível identificar links em arquivos markdown e seus respectivos status https.

## 2. Instalação

`npm install md-links-daphnevilhar`

## 3. CLI

Quando apenas entregamos o caminho do arquivo (caminho abaixo), o comportamento esperado é que ele devolva o caminho do arquivo, o link, e o nome.

`md-links caminho-do-arquivo`

Quando acrescentamos à listagem anterior *--validate* aparecerá o respectivo status https de cada link, indicando quais estão válidos, quais estão quebrados e quais não existem.

`md-links caminho-do-arquivo --validate`

## 4. Ferramentas Utilizadas



