# 06. Arquitetura e Projeto

## 1. Visão arquitetural

O Sistema de Controle de Estoque será desenvolvido como uma aplicação web utilizando arquitetura em camadas inspirada nos princípios de Clean Architecture, buscando separação de responsabilidades, modularização e facilidade de manutenção.

O sistema será dividido entre frontend, backend e persistência de dados, permitindo melhor organização do projeto e evolução incremental da solução.

### Estilo arquitetural adotado:
- Arquitetura em camadas;
- Cliente-servidor;
- Estrutura modular baseada em Clean Architecture.

### Justificativa:

A arquitetura em camadas foi escolhida para separar claramente:
- interface do usuário;
- regras de negócio;
- acesso aos dados;
- persistência.

Essa abordagem facilita:
- manutenção;
- reutilização de código;
- testes;
- organização do sistema;
- escalabilidade futura.

Além disso, a utilização de conceitos de Clean Architecture contribui para reduzir acoplamento entre módulos e melhorar a divisão de responsabilidades do projeto.

---

## 2. Estrutura em alto nível

### Camadas ou módulos

| Camada/Módulo | Responsabilidade |
|---|---|
| Apresentação | Responsável pelas interfaces da aplicação web, interação com o usuário e consumo da API |
| Aplicação | Responsável pelos casos de uso, regras de negócio e fluxo das operações do sistema |
| Domínio | Responsável pelas entidades centrais, contratos e regras de negócio principais |
| Persistência | Responsável pelo acesso ao banco de dados e armazenamento das informações |

---

## 3. Principais decisões de projeto

| Decisão | Motivação | Impacto |
|---|---|---|
| Utilização do NestJS no backend | Melhor organização modular, suporte a TypeScript e injeção de dependência | Facilita manutenção, escalabilidade e organização do sistema |
| Uso de React + Vite no frontend | Desenvolvimento rápido e componentização da interface | Melhor reutilização de componentes e desempenho no desenvolvimento |
| Utilização de PostgreSQL | Banco relacional robusto e amplamente utilizado | Maior confiabilidade e facilidade no gerenciamento de dados |
| Utilização do TypeORM | Facilidade no mapeamento objeto-relacional | Redução da complexidade no acesso ao banco |
| Aplicação de Clean Architecture | Melhor separação de responsabilidades | Redução de acoplamento e maior organização estrutural |

---

## 4. Tecnologias previstas

| Tecnologia | Finalidade | Justificativa |
|---|---|---|
| React | Interface web | Componentização, reutilização e ampla adoção |
| Vite | Build e desenvolvimento frontend | Ambiente leve e rápido |
| NestJS | API backend | Arquitetura modular e suporte a boas práticas |
| TypeScript | Linguagem principal | Maior segurança e tipagem estática |
| PostgreSQL | Banco de dados | Robustez e confiabilidade |
| TypeORM | ORM | Facilidade de persistência e integração com PostgreSQL |
| JWT | Autenticação | Segurança e controle de acesso |
| BCrypt | Criptografia de senhas | Proteção de credenciais dos usuários |

---

## 5. Riscos técnicos

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Dificuldade na implementação da arquitetura | Média | Alta | Estudo prévio da estrutura e divisão clara das responsabilidades |
| Integração entre frontend e backend | Média | Média | Padronização da API e testes incrementais |
| Problemas de modelagem do banco | Baixa | Alta | Revisão da modelagem antes da implementação |
| Complexidade do TypeORM | Média | Média | Utilização de documentação oficial e testes locais |
| Falta de experiência com Clean Architecture | Média | Média | Pesquisa, exemplos práticos e refinamento gradual da estrutura |

---

## 6. Exemplo resumido

> Será adotada arquitetura em camadas inspirada em Clean Architecture, separando interface, regras de negócio e persistência de dados, utilizando React no frontend, NestJS no backend e PostgreSQL como banco de dados, buscando facilitar manutenção, organização e evolução incremental do projeto.
