import { Badge } from "@/components/ui/badge";
import { formatStatus } from "@/lib/utils";

export function StatusBadge({ status }: { status: string | null | undefined }) {
  const key = String(status ?? "").toLowerCase();
  let className = "";
  if (key === "pendente" || key === "pending") {
    className = "border-yellow-500/40 bg-yellow-500/20 text-yellow-300";
  } else if (key === "pago" || key === "paid" || key === "completed") {
    className = "border-green-500/40 bg-green-500/20 text-green-300";
  } else if (key === "vencido" || key === "overdue") {
    className = "border-red-500/40 bg-red-500/20 text-red-300";
  }
  return (
    <Badge variant="outline" className={className}>
      {formatStatus(status)}
    </Badge>
  );
}
