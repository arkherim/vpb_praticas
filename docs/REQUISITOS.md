# Sistema de Gestão de Finanças Domésticas

> Documentação de Requisitos 


## Visão Geral

Aplicação web para gestão de finanças pessoais e domésticas, permitindo ao usuário controlar receitas, despesas, contas bancárias e compromissos financeiros futuros, com visualização de relatórios e gráficos.


## Requisitos Funcionais

### Módulo: Autenticação e Conta

| ID | Descrição | Feito? |
|----|-----------|-----------|
| RF01 | O sistema deve permitir que o usuário se cadastre informando nome, e-mail e senha. | Sim |
| RF02 | O sistema deve permitir login com e-mail e senha. | Sim |
| RF03 | O sistema deve permitir que o usuário edite seus dados de perfil (nome, e-mail, senha). | Parcialmente |
| RF04 | O sistema deve permitir que o usuário exclua sua conta. | Sim |


### Módulo: Contas Bancárias / Carteiras

| ID | Descrição | Feito? |
|----|-----------|-----------|
| RF05 | O sistema deve permitir cadastrar contas (ex: conta corrente, poupança, carteira de dinheiro). | Parcialemnte |
| RF06 | O sistema deve permitir editar e excluir contas. | Sim |
| RF07 | O sistema deve exibir o saldo atual de cada conta. | Sim |


### Módulo: Categorias

| ID | Descrição | Feito? |
|----|-----------|-----------|
| RF08 | O sistema deve ter categorias padrão de gastos (alimentação, transporte, saúde, lazer, etc.). | Sim |
| RF09 | O sistema deve permitir que o usuário crie categorias personalizadas. | Sim |
| RF10 | O sistema deve permitir editar e excluir categorias personalizadas. | Sim |


### Módulo: Movimentações

| ID | Descrição | Feito? |
|----|-----------|-----------|
| RF11 | O sistema deve permitir cadastrar uma movimentação informando: tipo (receita/despesa), valor, data, categoria e conta. | Sim |
| RF12 | O sistema deve permitir adicionar uma descrição opcional à movimentação. | Sim |
| RF13 | O sistema deve permitir editar e excluir movimentações. | Sim |
| RF14 | O sistema deve listar as movimentações com filtros por período, categoria e conta. | Sim |


### Módulo: Compromissos Futuros

| ID | Descrição | Feito? |
|----|-----------|-----------|
| RF18 | O sistema deve permitir cadastrar um compromisso futuro informando: tipo (receita/despesa esperada), valor, data de vencimento, categoria e descrição. | Sim |
| RF19 | O sistema deve exibir os compromissos futuros pendentes em destaque no dashboard. | Sim |
| RF20 | O sistema deve alertar visualmente no dashboard compromissos com vencimento próximo (próximos 7 dias) ou em atraso. | Não |
| RF21 | O sistema deve permitir confirmar um compromisso futuro, convertendo-o automaticamente em uma movimentação realizada vinculada à conta escolhida. | Sim |
| RF22 | O sistema deve permitir editar e excluir compromissos futuros. | Sim |


### Módulo: Relatórios e Gráficos

| ID | Descrição | Feito? |
|----|-----------|-----------|
| RF15 | O sistema deve exibir um resumo mensal com total de receitas, despesas e saldo do período. | Sim |
| RF16 | O sistema deve exibir um gráfico de gastos por categoria. | Sim |
| RF17 | O sistema deve permitir filtrar os relatórios por período (mês/ano). | Sim |


## Requisitos Não-Funcionais

| ID | Descrição | Feito? |
|----|-----------|-----------|
| RNF01 | O sistema deve ser responsivo e funcionar em navegadores modernos. | Sim |
| RNF02 | As senhas dos usuários devem ser armazenadas com criptografia (hash). | Não |
| RNF03 | O sistema deve validar os dados de entrada nos formulários antes de salvar. | Sim |
| RNF04 | A interface deve ser intuitiva, priorizando simplicidade para usuários não técnicos. | Sim |

