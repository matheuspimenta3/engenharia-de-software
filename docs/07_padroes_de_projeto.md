# Padrões de Projetos

## 1. Objetivo

Apresentar os padrões de projeto considerados para a solução de Controle de Estoque, com foco em flexibilidade, organização do código, desacoplamento entre componentes e facilidade de manutenção do sistema.

---

## 2. Padrões Selecionados

| Padrão | Onde será usado | Problema que resolve | Justificativa |
|---|---|---|---|
| Strategy | Regras de movimentação de estoque no Serviço de Estoque | Permite tratar diferentes tipos de movimentação com comportamentos distintos, sem concentrar muitas decisões condicionais em uma única classe | O sistema já possui registro de entrada e saída de mercadorias, e cada operação possui regras próprias, como somar saldo, validar disponibilidade e registrar motivo da saída |
| Repository Pattern | Camada de persistência e acesso aos dados | Isola a lógica de acesso ao banco de dados das regras de negócio | O projeto utiliza TypeORM e Clean Architecture, tornando necessário separar persistência e domínio para reduzir acoplamento e facilitar manutenção |
| Observer | Atualização de alertas de estoque e possíveis notificações após movimentações | Permite que outros componentes reajam automaticamente a alterações no estoque sem depender de chamadas diretas entre módulos | Como o projeto prevê alerta de estoque baixo e geração de informações atualizadas após entradas e saídas, esse padrão ajuda a desacoplar a atualização do saldo da verificação de alertas |

---

## 3. Exemplo de Aplicação

### Padrão: Strategy

**Contexto:**  
No sistema de controle de estoque, as movimentações não seguem exatamente a mesma lógica. Uma entrada adiciona quantidade ao saldo do produto, enquanto uma saída exige validação da quantidade disponível antes da baixa no estoque.

**Aplicação no projeto:**  
O padrão Strategy será utilizado para separar as regras de movimentação de estoque. Assim, haverá uma estratégia para entrada e outra para saída, permitindo que o sistema escolha a regra adequada conforme o tipo de operação realizada.

**Benefício esperado:**  
Esse padrão melhora a organização da lógica de negócio, reduz o uso excessivo de estruturas condicionais e facilita a inclusão de novos tipos de movimentação no futuro.


### Padrão: Repository Pattern

**Contexto:**
O sistema precisa acessar informações de produtos, usuários e movimentações armazenadas no banco de dados PostgreSQL.

**Aplicação no projeto:**
O padrão Repository será utilizado para abstrair o acesso aos dados, permitindo que os casos de uso e serviços trabalhem apenas com contratos e não diretamente com o TypeORM.

Exemplos:
- ProductRepository;
- UserRepository;
- MovementRepository.

**Benefício esperado:**
Esse padrão reduz o acoplamento entre as regras de negócio e a tecnologia de persistência, facilita testes e mantém aderência aos princípios da Clean Architecture.

### Padrão: Observer

**Contexto:**  
Sempre que o estoque de um produto for alterado, outras partes do sistema podem precisar reagir, como a verificação de estoque mínimo ou a atualização de alertas.

**Aplicação no projeto:**  
O padrão Observer será utilizado para permitir que componentes responsáveis por alertas e monitoramento acompanhem alterações no estoque. Assim, após uma movimentação, o sistema poderá acionar automaticamente verificações relacionadas ao nível de estoque.

**Benefício esperado:**  
Esse padrão contribui para o desacoplamento entre os módulos, melhora a manutenção do sistema e permite adicionar novas reações a eventos de estoque sem alterar diretamente a lógica principal.

---

## 4. Alternativas Consideradas

| Alternativa | Motivo para não adoção |
|---|---|
| Uso de condicionais extensas em uma única classe de estoque | Essa abordagem concentra muitas regras em um único ponto, dificultando manutenção, testes e evolução do sistema |
| Criação manual de cada tipo de movimentação diretamente nos controladores | Aumenta o acoplamento entre a camada de API e a lógica de negócio, reduzindo reutilização e clareza na arquitetura |

---

## 5. Conclusão

Os padrões de projeto selecionados contribuem para tornar a solução mais organizada, flexível e preparada para evolução incremental. O padrão Strategy favorece a separação das regras de negócio por tipo de movimentação. O Factory Method melhora a padronização da criação dos objetos utilizados pelo sistema. Já o Observer contribui para desacoplar a atualização do estoque de comportamentos derivados, como alertas e notificações. Em conjunto, esses padrões fortalecem a qualidade do projeto, facilitam manutenção futura e mantêm coerência com a arquitetura em camadas e com os requisitos definidos para o sistema.
