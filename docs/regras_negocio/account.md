# Account

## Classe: Conta

### Responsabilidade

Representa uma conta financeira do usuario, como conta corrente, poupanca ou carteira.

### Atributos de dominio

- `id`
- `id_usuario`
- `banco`
- `agencia`
- `numero_conta`
- `tipo`
- `saldo`
- `criado_em`
- `atualizado_em`

### Regras de negocio

- Toda conta pertence a exatamente um usuario.
- Nao e permitido cadastrar conta sem `id_usuario`.
- O usuario informado deve existir.
- `banco` e obrigatorio.
- `agencia` e obrigatoria.
- `numero_conta` e obrigatorio.
- `tipo` e obrigatorio.
- `saldo` e obrigatorio no cadastro atual da API.
- `saldo` deve ser um valor decimal valido.

### Regras por operacao

#### Cadastro

- `POST /accounts`
- Entrada esperada:
  - `user_id`
  - `bank`
  - `branch`
  - `account_number`
  - `account_type`
  - `balance`
- O cadastro deve falhar se o usuario nao existir.

#### Edicao

- `PATCH /accounts/{id}`
- Estrutura ainda nao implementada.
- Regras detalhadas pendentes.

#### Exclusao

- `DELETE /accounts/{id}`
- Estrutura ainda nao implementada.
- Regras detalhadas pendentes.

#### Consulta de saldo

- A conta deve expor seu saldo atual.
- A forma de consulta ainda sera detalhada na documentacao de rota correspondente.

### Observacoes de implementacao atuais

- A validacao principal do grupo de conta deve ficar no service.
- O schema de conta deve permanecer simples e servir como contrato de payload e resposta.
