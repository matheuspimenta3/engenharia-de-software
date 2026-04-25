
# Modelagem

### 1. Diagrama de Casos de Uso

O diagrama de casos de uso representa os principais atores do sistema e as funcionalidades disponíveis para cada perfil.

- Atores:
  - Usuário (Funcionário)
  - Gestor (Responsável)
  - Administrador

- Principais funcionalidades:
  - Autenticação no sistema
  - Cadastro e gerenciamento de produtos
  - Registro de entradas e saídas
  - Consulta, busca e filtro de produtos
  - Visualização de alertas de estoque
  - Geração de relatórios

![Diagrama de Casos de Uso](./imagens/casos-de-uso.png)

---

### 2. Diagrama de Componentes

O diagrama de componentes representa a estrutura da aplicação web, evidenciando a separação entre front-end, back-end, serviços e persistência de dados.

- Principais componentes:
  - Interface Web (Front-end)
  - API REST (Back-end)
  - Serviço de Estoque
  - Serviço de Autenticação
  - Serviço de Relatórios
  - Camada de Persistência
  - Banco de Dados

![Diagrama de Componentes](./imagens/componentes.png)

## Observações

- Os diagramas foram desenvolvidos utilizando PlantUML.
- A modelagem segue os requisitos funcionais definidos no backlog do projeto.
- Foram aplicados os relacionamentos include e extend conforme a semântica UML.

---

##  Responsável

Diagramas desenvolvidos por: **Lucas Neves**
