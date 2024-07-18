# Projeto WebApp

Este projeto é uma aplicação web desenvolvida com Vue.js e Tailwind CSS. Abaixo estão as principais tecnologias utilizadas, as rotas implementadas e um guia para iniciar o projeto.

## Tecnologias Utilizadas

- Vue.js (v2) - Framework JavaScript para construção de interfaces de usuário.
- Vue Router - Gerenciamento de rotas para navegação entre páginas.
- Axios - Cliente HTTP para realizar requisições à API.
- Tailwind CSS - Framework de CSS utilitário para estilização.
- Jest - Framework de testes para garantir a qualidade do código.

## Rotas Implementadas

/ - Página inicial que exibe uma lista de filmes populares.
/search - Página de pesquisa para buscar por termos específicos.
/results - Página que exibe os resultados da pesquisa.
/movie/:id - Página de detalhes, exibindo informações detalhadas e elenco.

## Passo-a-passo para Inicializar o Projeto


Clone o repositório:
git clone https://github.com/seu-usuario/webapp.git

Navegue até o diretório do projeto:
cd webapp

Instale as dependências:
npm install

Inicie o servidor de desenvolvimento:
npm run serve

Acesse o WebApp:
Abra seu navegador e vá para http://localhost:8080 para ver a aplicação em execução.

Testes
Para rodar os testes unitários, execute:
npm run test:unit

Para rodas os testes e2e, execute:
npm run teste:e2e

