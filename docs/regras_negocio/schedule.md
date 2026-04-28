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
- Regras detalhadas de confirmacao, listagem de pendentes e proximos vencimentos ainda serao refinadas antes da implementacao.

### Regras por operacao

- `POST /schedules`: pendente
- `GET /schedules`: pendente
- `PATCH /schedules/{id}`: pendente
- `DELETE /schedules/{id}`: pendente
- `POST /schedules/{id}/confirm`: pendente
