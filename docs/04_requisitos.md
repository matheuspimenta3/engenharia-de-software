# Requisitos Funcionais

| ID | Nome | Descrição | Prioridade |
|:---|:---|:---|:---|
| RF01 | Manter Produto | O sistema deve permitir o CRUD de produtos com nome, categoria, preço, unidade e quantidade. | Essencial |
| RF02 | Registrar Entrada | O sistema deve permitir adicionar quantidades ao estoque de um item existente. | Essencial |
| RF03 | Registrar Saída | O sistema deve permitir remover quantidades do estoque validando saldo disponível. | Essencial |
| RF04 | Alerta de Estoque | O sistema deve destacar produtos abaixo do limite mínimo. | Importante |
| RF05 | Autenticação | O sistema deve permitir login e restringir acesso a usuários cadastrados. | Essencial |
| RF06 | Relatório de Movimentação | O sistema deve gerar relatórios de entradas e saídas por período. | Desejável |
| RF07 | Buscar Produto | O sistema deve permitir buscar produtos pelo nome. | Importante |
| RF08 | Filtrar Produtos | O sistema deve permitir filtrar produtos por categoria. | Importante |

## 2. Requisitos Não Funcionais (RNF)
| ID | Nome | Descrição |
|:---|:---|:---|
| RNF01 | Interface Web | A aplicação deve ser acessível via navegadores modernos (Chrome, Firefox, Edge). |
| RNF02 | Persistência | Os dados devem ser armazenados em um banco de dados relacional. |
| RNF03 | Responsividade | A interface deve ser adaptável para uso em desktops e tablets. |
| RNF04 | Segurança | As senhas devem ser armazenadas utilizando algoritmos de hash (ex: BCrypt). |
