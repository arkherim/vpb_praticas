# User

## Classe: Usuario

### Responsabilidade

Representa a pessoa dona das contas, categorias e agendamentos do sistema.

### Atributos de dominio

- `id`
- `nome`
- `email`
- `senha_hash`
- `criado_em`
- `atualizado_em`

### Regras de negocio

- O cadastro inicial do usuario recebe `nome` e `email`.
- O `email` e obrigatorio no cadastro.
- O `nome` e obrigatorio no cadastro.
- O `email` deve ser unico no sistema.
- O `email` nao pode ser alterado apos o cadastro.
- A senha e tratada em fluxo separado do cadastro basico.
- A senha nao deve ser retornada pela API.
- O sistema deve armazenar `senha_hash`, nunca a senha em texto puro como regra final de negocio.
- Enquanto a estrutura de senha estiver em montagem, o fluxo deve continuar separado do restante da edicao do usuario.

### Regras por operacao

#### Cadastro

- `POST /users`
- Entrada esperada: `name`, `email`
- Nao recebe senha neste fluxo inicial.

#### Consulta

- `GET /users`
- Deve listar usuarios sem expor `senha_hash`.

#### Edicao de perfil

- `PATCH /users/{id}`
- Permite alterar apenas `name`.
- Nao permite alterar `email`.

#### Definicao ou troca de senha

- `PATCH /users/{id}/password`
- Fluxo separado da edicao de perfil.
- Deve receber apenas a senha.
- Deve atualizar somente `senha_hash`.

### Observacoes de implementacao atuais

- A validacao principal do grupo de usuario deve ficar no service, nao no schema.
- O schema de usuario deve permanecer simples e servir como contrato de payload e resposta.
