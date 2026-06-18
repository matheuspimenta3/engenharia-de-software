# Sistema de Controle de Estoque

Trabalho final da disciplina de Engenharia de Software, desenvolvido como aplicação prática dos conteúdos estudados ao longo do semestre.

## 1. Identificação do projeto

- **Nome do projeto:** Sistema de Controle de Estoque
- **Disciplina:** Engenharia de Software
- **Curso:** Sistemas de Informação
- **Turma/Semestre:** 2026/01 - 14A
- **Docente:** Johnatan Alves de Oliveira
- **Problema escolhido:** Controle de estoque

## 2. Integrantes do grupo

| Integrante | Papel no projeto |
|---|---|
| Alexandre Bortone | Product Owner / Backend |
| Matheus Freire Costa Pimenta | Scrum Master / Documentação |
| Lucas Marcelino Neves | Dev Team / Frontend |
| Mark Leite Sa | Dev Team / Integração |

## 3. Objetivo do trabalho

Desenvolver uma solução de software para controle de estoque, aplicando os principais conceitos da disciplina de Engenharia de Software, incluindo Scrum, requisitos, modelagem, arquitetura, padrões de projeto, implementação, testes e documentação incremental.

## 4. Descrição da solução

O Sistema de Controle de Estoque foi desenvolvido para apoiar pequenos comércios e empreendimentos na organização de seus produtos e movimentações de estoque.

A solução permite registrar produtos, acompanhar entradas e saídas de estoque, consultar informações cadastradas, organizar produtos por categoria e apoiar o controle das movimentações realizadas.

O projeto foi desenvolvido de forma incremental, com documentação das etapas realizadas ao longo das sprints.

## 5. Funcionalidades principais

- Cadastro, edição, consulta e remoção de produtos
- Cadastro e consulta de categorias
- Registro de entrada de estoque
- Registro de saída de estoque
- Consulta de movimentações de estoque
- Cadastro e gerenciamento básico de usuários
- Organização das funcionalidades em frontend e back-end
- Registro de testes e validações por meio de Issues

## 6. Tecnologias utilizadas

| Área | Tecnologia |
|---|---|
| Frontend | React, TypeScript, Vite e Axios |
| Back-end | NestJS, TypeScript, TypeORM e PostgreSQL |
| Documentação | Markdown |
| Controle de versão | Git e GitHub |
| Organização do trabalho | Scrum adaptado ao contexto acadêmico |
| Rastreamento | GitHub Issues |

## 7. Organização do repositório

```text
.
├── .github
│   └── ISSUE_TEMPLATE
│       ├── bug-report.md
│       └── test---validation.md
├── back-end
├── docs
│   ├── imagens
│   ├── 01_problema_e_visao_do_produto.md
│   ├── 02_scrum_e_organizacao_do_grupo.md
│   ├── 03_product_backlog.md
│   ├── 04_requisitos.md
│   ├── 05_modelagem.md
│   ├── 06_arquitetura_e_projeto.md
│   ├── 07_padroes_de_projeto.md
│   ├── 08_testes.md
│   ├── 09_entregas_incrementais.md
│   └── 10_apresentacao_final.md
├── frontend
├── sprints
│   ├── sprint-01.md
│   ├── sprint-02.md
│   ├── sprint-03.md
│   ├── sprint-04.md
│   ├── sprint-05.md
│   ├── sprint-06.md
│   ├── sprint-07.md
│   └── sprint-08.md
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

## 8. Como executar o projeto

### Pré-requisitos

- Node.js instalado
- npm instalado
- Git instalado
- PostgreSQL disponível para o back-end

### Executar o back-end

```bash
cd back-end
npm install
npm run start:dev
```

### Executar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Após iniciar o frontend, o terminal informará o endereço local para acessar a aplicação no navegador.

## 9. Documentação do projeto

| Documento | Descrição |
|---|---|
| `docs/01_problema_e_visao_do_produto.md` | Definição do problema e visão do produto |
| `docs/02_scrum_e_organizacao_do_grupo.md` | Organização do grupo e aplicação do Scrum |
| `docs/03_product_backlog.md` | Product Backlog do sistema |
| `docs/04_requisitos.md` | Requisitos funcionais e não funcionais |
| `docs/05_modelagem.md` | Modelagem do sistema e diagramas |
| `docs/06_arquitetura_e_projeto.md` | Arquitetura e decisões de projeto |
| `docs/07_padroes_de_projeto.md` | Padrões de projeto utilizados |
| `docs/08_testes.md` | Estratégia, casos e evidências de testes |
| `docs/09_entregas_incrementais.md` | Consolidação das entregas por sprint |
| `docs/10_apresentacao_final.md` | Planejamento da apresentação final |

## 10. Entregas incrementais

| Sprint | Período | Foco principal | Status |
|---|---|---|---|
| Sprint 01 | 04/04/2026 a 10/04/2026 | Problema, visão do produto e organização inicial | Concluída |
| Sprint 02 | 11/04/2026 a 17/04/2026 | Product Backlog e requisitos | Concluída |
| Sprint 03 | 18/04/2026 a 24/04/2026 | Modelagem do sistema | Concluída |
| Sprint 04 | 25/04/2026 a 01/05/2026 | Arquitetura e decisões de projeto | Concluída |
| Sprint 05 | 02/05/2026 a 08/05/2026 | Padrões de projeto | Concluída |
| Sprint 06 | 09/05/2026 a 22/05/2026 | Estrutura inicial do back-end e frontend | Concluída |
| Sprint 07 | 23/05/2026 a 05/06/2026 | Evolução das funcionalidades e testes manuais | Concluída |
| Sprint 08 | 06/06/2026 a 13/06/2026 | Finalização do projeto, documentação, testes e apresentação | Concluída |

## 11. Testes e evidências

Os testes foram registrados no documento `docs/08_testes.md`, contemplando testes funcionais, testes de interface, testes de integração e testes exploratórios.

Também foram utilizadas Issues do GitHub para registrar validações, defeitos encontrados e correções realizadas durante o desenvolvimento.

Foram utilizados os seguintes templates de Issues:

- `Bug report`: registro de defeitos, correções e ajustes
- `Test / Validation`: registro de testes manuais e validações de requisitos

## 12. Fluxo de trabalho adotado

O grupo utilizou uma adaptação do Scrum ao contexto acadêmico da disciplina. O trabalho foi organizado em sprints, com planejamento, execução, revisão do incremento e registro das pendências para a etapa seguinte.

O fluxo geral seguido foi:

1. definição do problema e visão do produto
2. organização do grupo
3. levantamento e priorização de requisitos
4. modelagem da solução
5. definição da arquitetura
6. escolha de padrões de projeto
7. implementação incremental
8. testes e validações
9. consolidação da documentação
10. preparação da apresentação final

## 13. Critérios de qualidade considerados

- Organização do repositório
- Clareza na documentação
- Rastreabilidade entre problema, requisitos, modelagem, implementação e testes
- Uso coerente do Scrum
- Evolução incremental do projeto
- Registro das sprints
- Registro de testes e evidências
- Coerência entre documentação e entrega final

## 14. Licença

Este projeto está licenciado sob a licença MIT.

# 🚀 Inicialização do projeto

## Backend (NestJS)

```bash
npm install
npm run build
npm run start:dev
```

## Frontend (Vite)

```bash
npm install
npm run dev
```

