// Dados mock do dashboard enquanto a API não expõe transações/resumo.

export type MockBank = "bb" | "santander";

export type Movement = {
  id: number;
  name: string;
  bank: MockBank;
  type: "entrada" | "saida";
  amount: number;
};

export const MOCK_BANKS: Record<MockBank, { label: string; color: string; initial: string }> = {
  bb: { label: "Banco do Brasil", color: "#fbe432", initial: "BB" },
  santander: { label: "Santander", color: "#ec0000", initial: "S" },
};

export const MOCK_SUMMARY = {
  total: 24580.75,
  income: 5200,
  expenses: 3860,
};

export const MOCK_MOVEMENTS: Movement[] = [
  { id: 1, name: "Lojas Americanas", bank: "bb", type: "saida", amount: 87.74 },
  { id: 2, name: "Sálario", bank: "bb", type: "entrada", amount: 6700 },
  { id: 3, name: "Lanchonete", bank: "santander", type: "saida", amount: 55.75 },
  { id: 4, name: "Netflix", bank: "santander", type: "saida", amount: 99 },
  { id: 5, name: "Conta de Água", bank: "bb", type: "saida", amount: 130 },
  { id: 6, name: "Presente", bank: "santander", type: "entrada", amount: 50 },
  { id: 7, name: "Uber", bank: "bb", type: "saida", amount: 24.5 },
  { id: 8, name: "Freela", bank: "santander", type: "entrada", amount: 850 },
];

export const toNumber = (v: unknown): number => {
  if (v === null || v === undefined || v === "") return 0;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
};

export const formatBRL = (v: unknown) =>
  toNumber(v).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
