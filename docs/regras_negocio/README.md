# Regras de Negocio

Este diretorio centraliza as regras de negocio do sistema, organizadas por grupo de rota.

## Estrutura

- [user.md](./user.md): regras de `Usuario` e operacoes do grupo de rotas de usuario.
- [account.md](./account.md): regras de `Conta` e operacoes do grupo de rotas de conta.
- [category.md](./category.md): regras de `Categoria` e operacoes do grupo de rotas de categoria.
- [transaction.md](./transaction.md): regras de `Transacao` e operacoes do grupo de rotas de transacao.
- [schedule.md](./schedule.md): regras de `Agendamento` e operacoes do grupo de rotas de agendamento.

## Como usar

- Cada arquivo deve refletir as regras vigentes do dominio.
- Antes de implementar ou alterar comportamento, a regra correspondente deve ser consultada e atualizada.
- Regras de negocio devem ser descritas de forma independente da tecnologia sempre que possivel.
