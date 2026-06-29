# Transaction

## Classe: Transacao

### Responsabilidade

Representa uma movimentacao financeira realizada.

### Atributos de dominio

- `id`
- `id_conta`
- `id_categoria`
- `id_agendamento`
- `tipo`
- `valor`
- `data`
- `descricao`
- `status`
- `criado_em`
- `atualizado_em`

### Regras de negocio

- Toda transacao deve estar vinculada a uma conta.
- Toda transacao deve estar vinculada a uma categoria.
- O vinculo com agendamento e opcional.
- Transacoes podem ser criadas manualmente ou geradas automaticamente por pagamento de agendamento.
- Quando gerada por pagamento de agendamento, a transacao deve ser vinculada por `id_agendamento`.

### Regras por operacao

- `POST /transactions`: pendente
- `GET /transactions`: pendente
- `PATCH /transactions/{id}`: pendente
- `DELETE /transactions/{id}`: pendente
