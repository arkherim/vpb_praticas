import { Badge } from "@/components/ui/badge";

export function TypeBadge({ type }: { type: string | null | undefined }) {
  const isIncome = String(type ?? "").toLowerCase() === "receita";
  const className = isIncome
    ? "border-transparent bg-green-600 text-white"
    : "border-transparent bg-red-600 text-white";
  return (
    <Badge variant="outline" className={className}>
      {isIncome ? "Receita" : "Despesa"}
    </Badge>
  );
}
