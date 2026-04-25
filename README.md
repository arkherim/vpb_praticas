# VPB App: Sistema de Orçamento Doméstico

## Definição

### Stack de desenvolvimento:
- Back-end: [Python](https://www.python.org/)
- Front-End: [React](https://react.dev/)
- SGDB: [PostgreSQL](https://www.postgresql.org/)
- Containerização: [Docker](https://www.docker.com/)

### Documento de Requisitos de Software
  _Requisitos Funcionais e Não Funcionais_
- [requisitos.md](./docs/REQUISITOS.md)  

## Modelagem

### Modelo ER Conceitual
  _Entidades e relacionamentos de alto nível_
- [PNG](./docs/er_conceitual/ER_Conceitual.png)
- [brM3](./docs/er_conceitual/ER_Conceitual.brM3)

### Modelo ER Lógico
  _Estrutura detalhada para implementação_
- [PNG](./docs/er_logico/ER_Logico.png)
- [brM3](./docs/er_logico/ER_Logico.brM3)

### Diagrama de Classes
  _Estrutura orientada a objetos_
- PNG: [diagrama_classes.png](./docs/diagrama_classes/diagrama_classes.png)  
- Draw.io: [arquivo compartilhado](https://drive.google.com/file/d/1e8C0G9d5Brp17dtFdTj24V11x80_-FJ7/view?usp=sharing)

## Comportamento do Sistema

- [Diagrama de Caso de Uso](./docs/use_cases.md)  
  _Interações do usuário com o sistema_

- Diagramas de Sequência  
  _Fluxo entre componentes_
  - Diagramas Agrupados: [diagrama_sequencia.md](./docs/diagramas_sequencia/diagrama_sequencia.md)
  - PNG:
    - [Login](./docs/diagramas_sequencia/diagramas_sequencia%20(png)/ds_login.png)
    - [Cadastro de Conta](./docs/diagramas_sequencia/diagramas_sequencia%20(png)/ds_conta_bancaria.png)
    - [Cadastro de Movimentação](./docs/diagramas_sequencia/diagramas_sequencia%20(png)/ds_movimentaçao.png)
    - [Cadastro de Compromisso](./docs/diagramas_sequencia/diagramas_sequencia%20(png)/ds_cadastra_compromisso.png)
    - [Confirma Pagamento do Compromisso](./docs/diagramas_sequencia/diagramas_sequencia%20(png)/confirma_compromisso.png)
    - [Relatório Mensal](./docs/diagramas_sequencia/diagramas_sequencia%20(png)/exibe_relatorio.png)
  - MMD:
    - [Login](./docs/diagramas_sequencia/diagramas_sequencia%20(mermaid)/ds_login.mmd)
    - [Cadastro de Conta](./docs/diagramas_sequencia/diagramas_sequencia%20(mermaid)/ds_conta_bancaria.mmd)
    - [Cadastro de Movimentação](./docs/diagramas_sequencia/diagramas_sequencia%20(mermaid)/ds_movimentaçao.mmd)
    - [Cadastro de Compromisso](./docs/diagramas_sequencia/diagramas_sequencia%20(mermaid)/ds_cadastra_compromisso.mmd)
    - [Confirma Pagamento do Compromisso](./docs/diagramas_sequencia/diagramas_sequencia%20(mermaid)/confirma_compromisso.mmd)
    - [Relatório Mensal](./docs/diagramas_sequencia/diagramas_sequencia%20(mermaid)/exibe%20relatorio.mmd)

- Diagramas de Atividades  
  _Fluxos operacionais_
  - Diagramas Agrupados (Draw.io): [arquivo compartilhado](https://drive.google.com/file/d/17XBYSKx-MPohxVqGwh1fZZ2NcCwamuKk/view)
  - PNG:
    - [Login](./docs/diagrama_atividades/da_cadastro_login.png)
    - [Cadastro de Conta](./docs/diagrama_atividades/da_cadastro_conta_bancaria.png)
    - [Cadastro de Movimentação](./docs/diagrama_atividades/da_cadastro_transacao.png)
    - [Cadastro de Compromisso](./docs/diagrama_atividades/da_cadastro_compromisso.png)
    - [Pagamento de Compromisso](./docs/diagrama_atividades/da_pagamento_compromisso.png)
    - [Relatório](./docs/diagrama_atividades/da_relatorio.png)
