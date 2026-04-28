# Category

## Classe: Categoria

### Responsabilidade

Organiza receitas, despesas e agendamentos do usuario.

### Atributos de dominio

- `id`
- `id_usuario`
- `nome`
- `descricao`
- `padrao`
- `criado_em`
- `atualizado_em`

### Regras de negocio

- Toda categoria pertence a um usuario.
- O sistema pode ter categorias padrao.
- O usuario pode criar categorias personalizadas.
- Regras detalhadas de cadastro, edicao e exclusao ainda serao refinadas antes da implementacao.

### Regras por operacao

- `POST /categories`: pendente
- `GET /categories`: pendente
- `PATCH /categories/{id}`: pendente
- `DELETE /categories/{id}`: pendente
