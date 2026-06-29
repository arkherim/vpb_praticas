import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STATUS_LABELS: Record<string, string> = {
  pago: "Pago",
  pendente: "Pendente",
  vencido: "Vencido",
  cancelado: "Cancelado",
  completed: "Concluído",
  pending: "Pendente",
  overdue: "Vencido",
  paid: "Pago",
};

export function formatStatus(status: string | null | undefined): string {
  if (!status) return "";
  const key = String(status).toLowerCase();
  if (STATUS_LABELS[key]) return STATUS_LABELS[key];
  return key.charAt(0).toUpperCase() + key.slice(1);
}
