# Diagrama de Sequência — Sistema de Gestão Financeira

## 1. Login

```mermaid
sequenceDiagram
    actor U as Usuário
    participant F as Frontend
    participant API as API 
    participant DB as Banco de Dados

    U->>F: Informa e-mail e senha
    F->>API: POST /auth/login {email, senha}
    API->>DB: SELECT usuario WHERE email = ?
    DB-->>API: Retorna usuário
    alt Credenciais válidas
        API->>API: Valida senha_hash
        API-->>F: 200 OK
        F-->>U: Redireciona para Dashboard
    else Credenciais inválidas
        API-->>F: 401 Unauthorized
        F-->>U: Exibe mensagem de erro
    end
```

---

## 2. Cadastro de Conta

```mermaid
sequenceDiagram
    actor U as Usuário
    participant F as Frontend
    participant API as API
    participant DB as Banco de Dados

    U->>F: Preenche formulário de conta
    F->>API: POST /contas {banco, agencia, numero_conta, tipo}
    API->>API: Valida payload
    alt Dados válidos
        API->>DB: INSERT INTO conta
        DB-->>API: Retorna conta criada
        API-->>F: 201 Created
        F-->>U: Exibe conta na listagem
    else Dados inválidos
        API-->>F: 422 Unprocessable Entity
        F-->>U: Exibe erros de validação
    end
```

---

## 3. Cadastro de Movimentação

```mermaid
sequenceDiagram
    actor U as Usuário
    participant F as Frontend
    participant API as API
    participant DB as Banco de Dados

    U->>F: Preenche formulário (tipo, valor, data, categoria, conta)
    F->>API: POST /transacoes {tipo, valor, data, id_categoria, id_conta}
    API->>API: Valida dados 
    API->>DB: SELECT conta WHERE id = id_conta
    DB-->>API: Retorna conta
    alt Dados válidos
        API->>DB: INSERT INTO transacao
        API->>DB: UPDATE conta SET saldo = saldo ± valor
        DB-->>API: OK
        API-->>F: 201 Created {transacao}
        F-->>U: Exibe movimentação na listagem
    else Dados inválidos
        API-->>F: 422 Unprocessable Entity
        F-->>U: Exibe erros de validação
    end
```

---

## 4. Cadastro de Compromisso

```mermaid
sequenceDiagram
    actor U as Usuário
    participant F as Frontend
    participant API as API
    participant DB as Banco de Dados
 
    U->>F: Preenche formulário (tipo, valor, vencimento, categoria, descrição)
    F->>API: POST /agendamentos {tipo, valor, vencimento, id_categoria, descricao}
    API->>API: Valida dados
    alt Dados válidos
        API->>DB: INSERT INTO agendamento (status = 'pendente')
        DB-->>API: Retorna agendamento criado
        API-->>F: 201 Created
        F-->>U: Exibe compromisso na listagem de pendentes
    else Dados inválidos
        API-->>F: 422 Unprocessable Entity
        F-->>U: Exibe erros de validação
    end
```

---

## 5. Confirma Pagamento do Compromisso

```mermaid
sequenceDiagram
    actor U as Usuário
    participant F as Frontend
    participant API as API
    participant DB as Banco de Dados

    U->>F: Clica em "Confirmar pagamento" no compromisso e seleciona conta
    F->>API: PATCH /agendamentos/{id}/confirmar {id_conta}
    API->>DB: SELECT agendamento WHERE id = ?
    DB-->>API: Retorna agendamento
    API->>DB: INSERT INTO transacao
    API->>DB: UPDATE conta SET saldo = saldo ± valor
    API->>DB: UPDATE agendamento SET status = 'confirmado'
    DB-->>API: OK
    API-->>F: 201 Created
    F-->>U: Compromisso marcado como confirmado
```

---

## 6. Relatório Mensal

```mermaid
sequenceDiagram
    actor U as Usuário
    participant F as Frontend
    participant API as API
    participant DB as Banco de Dados

    U->>F: Seleciona mês e ano no filtro
    F->>API: GET /relatorios/mensal?mes=4&ano=2026
    API->>DB: SELECT SUM(valor) WHERE tipo='receita' AND mes/ano
    API->>DB: SELECT SUM(valor) WHERE tipo='despesa' AND mes/ano
    API->>DB: SELECT SUM(valor) GROUP BY id_categoria AND mes/ano
    DB-->>API: Retorna totais e breakdown por categoria
    API-->>F: 200 OK {receitas, despesas, saldo, por_categoria}
    F-->>U: Exibe resumo e gráfico
```
