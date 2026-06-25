BEGIN;

ALTER TABLE agendamento
ADD COLUMN IF NOT EXISTS id_conta INTEGER;

UPDATE agendamento
SET id_conta = COALESCE(id_conta, 0)
WHERE id_conta IS NULL;

ALTER TABLE agendamento
ALTER COLUMN id_conta SET NOT NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'agendamento_id_conta_fkey'
    ) THEN
        ALTER TABLE agendamento
        ADD CONSTRAINT agendamento_id_conta_fkey
        FOREIGN KEY (id_conta) REFERENCES conta(id) ON DELETE RESTRICT;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS ix_agendamento_id_conta ON agendamento (id_conta);

COMMIT;
