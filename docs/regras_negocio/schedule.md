# Schedule

## Classe: Agendamento

### Responsabilidade

Representa um compromisso financeiro futuro.

### Atributos de dominio

- `id`
- `id_usuario`
- `id_categoria`
- `tipo`
- `valor`
- `vencimento`
- `descricao`
- `status`
- `criado_em`
- `atualizado_em`

### Regras de negocio

- Todo agendamento pertence a um usuario.
- Todo agendamento pertence a uma categoria.
- Um agendamento pode ou nao gerar uma transacao associada.
- O pagamento de agendamento pode ser parcial e cada pagamento gera uma transacao vinculada.
- Em pagamento parcial, o campo `valor` do agendamento passa a representar o saldo restante.
- Pagamento acima do saldo restante nao e permitido.
- Ao quitar o saldo restante, o status do agendamento muda automaticamente para `pago`.
- Enquanto houver saldo restante, o status permanece `pendente`.

### Regras por operacao

- `POST /schedules`: pendente
- `GET /schedules`: pendente
- `PATCH /schedules/{id}`: pendente
- `DELETE /schedules/{id}`: pendente
- `POST /schedules/{id}/payments`: registrar pagamento parcial/total com criacao de transacao vinculada
