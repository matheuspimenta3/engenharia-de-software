# Product Backlog

Este backlog representa as funcionalidades priorizadas pelo Product Owner para o Sistema de Controle de Estoque.

| ID | User Story (História de Usuário) | Requisito Relacionado | Critérios de Aceitação |
|:---|:---|:---|:---|
| US01 | Como usuário, quero cadastrar produtos para manter o catálogo atualizado. | RF01 | - Campos obrigatórios validados;<br>- Impedir nomes duplicados. |
| US02 | Como estoquista, quero registrar entradas de mercadoria para atualizar o saldo real. | RF02 | - Somar quantidade ao saldo atual;<br>- Registrar data da entrada. |
| US03 | Como estoquista, quero registrar saídas para dar baixa em itens vendidos/usados. | RF03 | - Impedir saída maior que o saldo;<br>- Registrar motivo da saída. |
| US04 | Como gestor, quero identificar itens com estoque baixo para planejar compras. | RF04 | - Listar produtos com qtd < qtd_minima;<br>- Alerta visual na cor vermelha. |
| US05 | Como usuário, quero autenticar no sistema para proteger os dados do estoque. | RF05 | - Mensagem de erro para senha inválida;<br>- Bloqueio de rotas não autenticadas. |
| US06 | Como usuário, quero buscar produtos pelo nome para encontrá-los rapidamente. | RF07 | - Permitir busca parcial por nome;<br>- Retornar lista filtrada. |
| US07 | Como usuário, quero filtrar produtos por categoria para facilitar a organização. | RF08 | - Permitir seleção de categoria;<br>- Exibir apenas produtos da categoria escolhida. |
