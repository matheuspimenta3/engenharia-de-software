# 08. Testes

## 1. Estratégia de testes

A estratégia de testes adotada pelo grupo teve como objetivo validar se o Sistema de Controle de Estoque atende aos requisitos funcionais e não funcionais definidos na documentação do projeto.

Os testes foram realizados principalmente de forma manual, funcional e exploratória, considerando os principais fluxos do sistema. A validação foi feita a partir dos requisitos definidos no documento de requisitos e no Product Backlog, verificando se as funcionalidades implementadas estavam coerentes com a proposta da aplicação.

Foram priorizados os testes das funcionalidades essenciais do sistema, como cadastro de produtos, entrada e saída de estoque, consulta de produtos, identificação de estoque baixo, autenticação, busca, filtro e consulta de movimentações.

As Issues criadas no GitHub também foram utilizadas como apoio para registrar validações, defeitos, melhorias e pendências encontradas durante a etapa de testes.

### Objetivos

- verificar se os requisitos foram atendidos;
- identificar falhas;
- garantir qualidade mínima do incremento.

---

## 2. Tipos de teste previstos

| Tipo de teste | Objetivo | Evidência esperada |
|---|---|---|
| Teste funcional | Validar funcionalidades | Casos de teste e resultados |
| Teste de interface | Verificar interação | Observações durante a navegação |
| Teste de integração | Validar comunicação entre módulos | Registro de execução |
| Teste exploratório | Identificar falhas não previstas | Relato de problemas |

---

## 3. Casos de teste

| ID | Requisito relacionado | Cenário | Entrada | Resultado esperado | Resultado obtido |
|---|---|---|---|---|---|
| CT01 | RF01 | Cadastro de produto com dados válidos | Nome, categoria, quantidade inicial, quantidade mínima e descrição | O produto deve ser cadastrado e ficar disponível para consulta | Aprovado |
| CT02 | RF01 | Cadastro de produto com dados obrigatórios incompletos | Produto sem nome ou sem quantidade inicial | O sistema deve impedir o cadastro ou indicar que existem dados obrigatórios ausentes | Aprovado |
| CT03 | RF01 | Edição de produto cadastrado | Alteração de nome, categoria ou quantidade mínima | O sistema deve atualizar os dados do produto | Aprovado |
| CT04 | RF01 | Exclusão de produto cadastrado | Produto existente selecionado para remoção | O sistema deve remover o produto ou impedir sua exibição na listagem principal | Aprovado |
| CT05 | RF02 | Registro de entrada de estoque | Produto existente e quantidade positiva | A quantidade do produto deve ser aumentada | Aprovado |
| CT06 | RF02 | Registro de entrada com quantidade inválida | Produto existente e quantidade igual a zero ou negativa | O sistema deve impedir a entrada inválida ou sinalizar o erro | Aprovado |
| CT07 | RF03 | Registro de saída de estoque com quantidade disponível | Produto existente e quantidade menor ou igual ao estoque atual | A quantidade do produto deve ser reduzida | Aprovado |
| CT08 | RF03 | Registro de saída maior que o estoque disponível | Produto existente e quantidade maior que o estoque atual | O sistema deve impedir a saída ou sinalizar erro | Aprovado |
| CT09 | RF04 | Verificação de produto com estoque baixo | Produto com quantidade atual menor ou igual à quantidade mínima | O sistema deve indicar que o produto está com estoque baixo | Aprovado |
| CT10 | RF05 | Login com dados válidos | E-mail e senha cadastrados | O usuário deve conseguir acessar o sistema | Aprovado |
| CT11 | RF05 | Login com dados inválidos | E-mail ou senha incorretos | O sistema deve negar o acesso | Aprovado |
| CT12 | RF06 | Consulta de movimentações de estoque | Produto ou período informado | O sistema deve permitir acompanhar entradas e saídas registradas | Aprovado |
| CT13 | RF07 | Busca de produto pelo nome | Nome de produto cadastrado | O sistema deve retornar o produto correspondente | Aprovado |
| CT14 | RF08 | Filtro de produtos por categoria | Categoria existente | O sistema deve listar produtos relacionados à categoria selecionada | Aprovado |
| CT15 | RNF01 | Verificação de usabilidade básica | Navegação pelas funcionalidades principais | O sistema deve ser compreensível para o usuário | Aprovado |
| CT16 | RNF02 | Verificação de desempenho básico | Execução das operações principais | O sistema deve responder em tempo aceitável para o contexto acadêmico | Aprovado |
| CT17 | RNF03 | Verificação da organização do projeto | Análise das pastas de backend, frontend, documentação e sprints | O projeto deve estar organizado e permitir manutenção | Aprovado |
| CT18 | RNF04 | Verificação de manutenibilidade | Análise da separação entre código, documentação e módulos | A estrutura deve permitir evolução futura | Aprovado |
| CT19 | RNF05 | Verificação de segurança básica | Tentativa de acesso com dados inválidos | O sistema não deve permitir acesso indevido | Aprovado |

---

## 4. Critérios de aceitação dos testes

- os testes devem estar alinhados aos requisitos;
- cada funcionalidade essencial deve ter evidência;
- falhas identificadas devem ser registradas;
- os resultados devem indicar se o teste foi aprovado, aprovado parcialmente ou se ficou pendente;
- os defeitos encontrados devem ser relacionados a ações de correção ou melhoria;
- os testes devem apoiar a validação da entrega final;
- as Issues criadas no GitHub devem ser utilizadas como apoio para rastrear testes, defeitos e melhorias.

---

## 5. Registro de defeitos

| ID | Defeito | Severidade | Status | Ação tomada |
|---|---|---|---|---|
| BUG01 | Algumas validações de campos obrigatórios precisaram ser reforçadas | Média | Corrigido | Defeito registrado em Issue e corrigido para melhorar a validação dos dados |
| BUG02 | Algumas mensagens de erro precisaram ser ajustadas para melhorar o entendimento do usuário | Baixa | Corrigido | Melhoria registrada em Issue e ajustada para tornar o uso mais claro |
| BUG03 | A integração entre frontend e backend exigiu ajustes durante a etapa final | Média | Corrigido | Pendência registrada em Issue e ajustada para permitir o funcionamento básico esperado |
| BUG04 | A consulta de movimentações pode ser expandida com filtros mais completos | Baixa | Melhoria futura | Melhoria registrada em Issue para evolução posterior do sistema |
| BUG05 | A cobertura de testes automatizados ainda pode ser ampliada | Média | Melhoria futura | Melhoria registrada em Issue para evolução dos testes |
| BUG06 | A autenticação básica pode ser refinada em versões futuras quanto a permissões e mensagens de retorno | Baixa | Melhoria futura | Melhoria registrada em Issue para refinamento da segurança e da usabilidade |

---

## 6. Evidências

As evidências dos testes foram registradas por meio de:

- execução manual das funcionalidades principais;
- resultados descritos nos casos de teste;
- registro dos defeitos encontrados;
- registros em Issues no GitHub;
- relatórios simples de validação documentados neste arquivo.

As Issues criadas no GitHub foram utilizadas para apoiar a rastreabilidade entre requisitos, testes, defeitos e melhorias do projeto. Dessa forma, os casos de teste e os problemas identificados durante a validação ficaram associados ao acompanhamento das tarefas do grupo.

As principais Issues relacionadas aos testes e defeitos foram organizadas nos seguintes temas:

- validação de cadastro, edição e remoção de produtos;
- validação de entrada de estoque;
- validação de saída de estoque;
- validação da identificação de estoque baixo;
- validação de autenticação de usuários;
- validação de busca e filtro de produtos;
- validação da consulta de movimentações;
- registro de melhorias nas validações obrigatórias;
- registro de melhorias nas mensagens de erro;
- registro de melhorias futuras nos testes automatizados;
- registro de melhorias futuras na autenticação e permissões.

---

## 7. Exemplo resumido

> O requisito RF01 foi validado por meio dos casos de teste CT01, CT02, CT03 e CT04, nos quais o usuário realiza operações relacionadas ao cadastro, edição e remoção de produtos. Os testes consideraram tanto entradas válidas quanto situações com dados incompletos.

> O requisito RF03 foi validado por meio dos casos CT07 e CT08, nos quais foi verificado o comportamento do sistema durante a saída de estoque. Quando a quantidade estava disponível, o sistema deveria reduzir o estoque. Quando a quantidade era maior que o estoque atual, o sistema deveria impedir a operação ou indicar erro.

> O requisito RF04 foi validado por meio do caso CT09, no qual foi verificado se produtos com quantidade igual ou inferior ao limite mínimo eram identificados como produtos com estoque baixo.

> O requisito RF06 foi validado por meio do caso CT12, no qual foi verificada a consulta de movimentações de estoque. Para a entrega acadêmica, o comportamento foi considerado aprovado, ficando como melhoria futura a possibilidade de expandir filtros e relatórios.
