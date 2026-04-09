# Sistema de Gestão de Finanças Domésticas

> Documentação de Requisitos 


## Visão Geral

Aplicação web para gestão de finanças pessoais e domésticas, permitindo ao usuário controlar receitas, despesas, contas bancárias e compromissos financeiros futuros, com visualização de relatórios e gráficos.


## Requisitos Funcionais

### Módulo: Autenticação e Conta

| ID | Descrição |
|----|-----------|
| RF01 | O sistema deve permitir que o usuário se cadastre informando nome, e-mail e senha. |
| RF02 | O sistema deve permitir login com e-mail e senha. |
| RF03 | O sistema deve permitir que o usuário edite seus dados de perfil (nome, e-mail, senha). |
| RF04 | O sistema deve permitir que o usuário exclua sua conta. |


### Módulo: Contas Bancárias / Carteiras

| ID | Descrição |
|----|-----------|
| RF05 | O sistema deve permitir cadastrar contas (ex: conta corrente, poupança, carteira de dinheiro). |
| RF06 | O sistema deve permitir editar e excluir contas. |
| RF07 | O sistema deve exibir o saldo atual de cada conta. |


### Módulo: Categorias

| ID | Descrição |
|----|-----------|
| RF08 | O sistema deve ter categorias padrão de gastos (alimentação, transporte, saúde, lazer, etc.). |
| RF09 | O sistema deve permitir que o usuário crie categorias personalizadas. |
| RF10 | O sistema deve permitir editar e excluir categorias personalizadas. |


### Módulo: Movimentações

| ID | Descrição |
|----|-----------|
| RF11 | O sistema deve permitir cadastrar uma movimentação informando: tipo (receita/despesa), valor, data, categoria e conta. |
| RF12 | O sistema deve permitir adicionar uma descrição opcional à movimentação. |
| RF13 | O sistema deve permitir editar e excluir movimentações. |
| RF14 | O sistema deve listar as movimentações com filtros por período, categoria e conta. |


### Módulo: Compromissos Futuros

| ID | Descrição |
|----|-----------|
| RF18 | O sistema deve permitir cadastrar um compromisso futuro informando: tipo (receita/despesa esperada), valor, data de vencimento, categoria e descrição. |
| RF19 | O sistema deve exibir os compromissos futuros pendentes em destaque no dashboard. |
| RF20 | O sistema deve alertar visualmente no dashboard compromissos com vencimento próximo (próximos 7 dias) ou em atraso. |
| RF21 | O sistema deve permitir confirmar um compromisso futuro, convertendo-o automaticamente em uma movimentação realizada vinculada à conta escolhida. |
| RF22 | O sistema deve permitir editar e excluir compromissos futuros. |


### Módulo: Relatórios e Gráficos

| ID | Descrição |
|----|-----------|
| RF15 | O sistema deve exibir um resumo mensal com total de receitas, despesas e saldo do período. |
| RF16 | O sistema deve exibir um gráfico de gastos por categoria. |
| RF17 | O sistema deve permitir filtrar os relatórios por período (mês/ano). |


## Requisitos Não-Funcionais

| ID | Descrição |
|----|-----------|
| RNF01 | O sistema deve ser responsivo e funcionar em navegadores modernos. |
| RNF02 | As senhas dos usuários devem ser armazenadas com criptografia (hash). |
| RNF03 | O sistema deve validar os dados de entrada nos formulários antes de salvar. |
| RNF04 | A interface deve ser intuitiva, priorizando simplicidade para usuários não técnicos. |

