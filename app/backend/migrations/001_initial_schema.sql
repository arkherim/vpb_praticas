BEGIN;

CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255),
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conta (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    banco VARCHAR(100) NOT NULL,
    agencia VARCHAR(20) NOT NULL,
    numero_conta VARCHAR(30) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    saldo NUMERIC(12, 2) NOT NULL DEFAULT 0,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categoria (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    nome VARCHAR(80) NOT NULL,
    descricao VARCHAR(255),
    padrao BOOLEAN NOT NULL DEFAULT FALSE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS agendamento (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    id_categoria INTEGER NOT NULL REFERENCES categoria(id) ON DELETE RESTRICT,
    tipo VARCHAR(10) NOT NULL,
    valor NUMERIC(12, 2) NOT NULL,
    vencimento DATE NOT NULL,
    descricao VARCHAR(255),
    status VARCHAR(20) NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transacao (
    id SERIAL PRIMARY KEY,
    id_conta INTEGER NOT NULL REFERENCES conta(id) ON DELETE RESTRICT,
    id_categoria INTEGER NOT NULL REFERENCES categoria(id) ON DELETE RESTRICT,
    id_agendamento INTEGER REFERENCES agendamento(id) ON DELETE SET NULL,
    tipo VARCHAR(10) NOT NULL,
    valor NUMERIC(12, 2) NOT NULL,
    data DATE NOT NULL,
    descricao VARCHAR(255),
    status VARCHAR(20) NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_conta_id_usuario ON conta (id_usuario);
CREATE INDEX IF NOT EXISTS ix_categoria_id_usuario ON categoria (id_usuario);
CREATE INDEX IF NOT EXISTS ix_agendamento_id_usuario ON agendamento (id_usuario);
CREATE INDEX IF NOT EXISTS ix_agendamento_id_categoria ON agendamento (id_categoria);
CREATE INDEX IF NOT EXISTS ix_transacao_id_conta ON transacao (id_conta);
CREATE INDEX IF NOT EXISTS ix_transacao_id_categoria ON transacao (id_categoria);
CREATE INDEX IF NOT EXISTS ix_transacao_id_agendamento ON transacao (id_agendamento);

COMMIT;
