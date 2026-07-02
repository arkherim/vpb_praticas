import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useSuspenseQuery, c as useQuery, d as useQueries, u as useQueryClient, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { T as TypeBadge, S as StatusBadge, l as accountLabel, m as formatBRL, g as getSession, R as accountDashboardQueryOptions, t as transactionsQueryOptions, J as schedulesQueryOptions, c as categoriesQueryOptions, D as Dialog, h as DialogContent, i as DialogHeader, j as DialogTitle, B as Button, a as accountsQueryOptions, P as cn, N as paySchedule } from "./router-HQqh2RWn.mjs";
import { I as Input } from "./input-D3-I1JTw.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-ZzkZGiOr.mjs";
import { e as Check } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Legend, b as Line } from "../_libs/recharts.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/cmdk.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const toNum$1 = (v) => {
  const n = typeof v === "number" ? v : parseFloat(String(v ?? "0"));
  return Number.isFinite(n) ? n : 0;
};
const PALETTE = [
  "#a855f7",
  "#22d3ee",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#6366f1",
  "#ec4899",
  "#84cc16",
  "#f97316",
  "#14b8a6"
];
function ReportsTab({
  transactions,
  accounts,
  categories
}) {
  const [period, setPeriod] = reactExports.useState(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 7));
  const filtered = reactExports.useMemo(
    () => transactions.filter((t) => (t.date ?? "").slice(0, 7) === period),
    [transactions, period]
  );
  const { chartData, series } = reactExports.useMemo(() => {
    const seriesMap = /* @__PURE__ */ new Map();
    const dayBuckets = /* @__PURE__ */ new Map();
    for (const t of filtered) {
      const day = (t.date ?? "").slice(8, 10);
      if (!day) continue;
      const cat = categories.find((c) => c.id === t.category_id);
      const catName = cat?.name ?? `#${t.category_id}`;
      const key = `${t.category_id}__${t.type}`;
      if (!seriesMap.has(key)) {
        seriesMap.set(key, {
          key,
          categoryId: t.category_id,
          type: t.type,
          name: `${catName} (${t.type})`
        });
      }
      if (!dayBuckets.has(day)) dayBuckets.set(day, {});
      const row = dayBuckets.get(day);
      row[key] = (row[key] ?? 0) + toNum$1(t.amount);
    }
    const days = Array.from(dayBuckets.keys()).sort();
    const data = days.map((d) => ({ day: d, ...dayBuckets.get(d) }));
    return { chartData: data, series: Array.from(seriesMap.values()) };
  }, [filtered, categories]);
  const totals = reactExports.useMemo(() => {
    let receita = 0, despesa = 0;
    for (const t of filtered) {
      if (t.type === "receita") receita += toNum$1(t.amount);
      else if (t.type === "despesa") despesa += toNum$1(t.amount);
    }
    return { receita, despesa };
  }, [filtered]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-3 rounded-2xl bg-card/60 p-4 ring-1 ring-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Período" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "month",
            value: period,
            onChange: (e) => setPeriod(e.target.value || (/* @__PURE__ */ new Date()).toISOString().slice(0, 7)),
            className: "w-44"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => setPeriod((/* @__PURE__ */ new Date()).toISOString().slice(0, 7)),
          children: "Mês atual"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex gap-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Receitas: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-[oklch(0.85_0.25_140)]", children: [
            "R$ ",
            formatBRL(totals.receita)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Despesas: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-[oklch(0.7_0.25_25)]", children: [
            "R$ ",
            formatBRL(totals.despesa)
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card/60 p-4 ring-1 ring-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 font-display text-xl", children: "Tendências por categoria" }),
      series.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-12 text-center text-sm text-muted-foreground", children: "Sem dados para o período." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[360px] w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: chartData, margin: { top: 10, right: 20, left: 0, bottom: 0 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.08)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", stroke: "rgba(255,255,255,0.5)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "rgba(255,255,255,0.5)", fontSize: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tooltip,
          {
            contentStyle: {
              background: "rgba(20,20,28,0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              fontSize: 12
            },
            formatter: (v) => `R$ ${formatBRL(v)}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 12 } }),
        series.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Line,
          {
            type: "monotone",
            dataKey: s.key,
            name: s.name,
            stroke: PALETTE[i % PALETTE.length],
            strokeWidth: 2,
            strokeDasharray: s.type === "despesa" ? "5 4" : void 0,
            dot: { r: 3 },
            connectNulls: true
          },
          s.key
        ))
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Linha contínua = receita · Linha tracejada = despesa" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 font-display text-xl", children: "Transações do período" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 rounded-2xl bg-card/60 p-4 ring-1 ring-white/5", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-sm text-muted-foreground", children: "Nenhuma transação no período." }) : [...filtered].sort((a, b) => b.date > a.date ? 1 : b.date < a.date ? -1 : b.id - a.id).map((t) => {
        const acc = accounts.find((a) => a.id === t.account_id);
        const cat = categories.find((c) => c.id === t.category_id);
        const isIncome = t.type === "receita";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-xl bg-card/80 px-4 py-3 ring-1 ring-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-display text-lg", children: t.description || `Transação #${t.id}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TypeBadge, { type: t.type }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: t.status }),
              cat && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.name }),
              acc && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: accountLabel(acc) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(t.date).toLocaleDateString("pt-BR") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `font-display text-base ${isIncome ? "text-[oklch(0.85_0.25_140)]" : "text-[oklch(0.7_0.25_25)]"}`, children: [
            "R$ ",
            formatBRL(t.amount)
          ] })
        ] }, t.id);
      }) })
    ] })
  ] });
}
const toNum = (v) => {
  const n = typeof v === "number" ? v : parseFloat(v ?? "0");
  return Number.isFinite(n) ? n : 0;
};
const isPending = (s) => {
  const k = String(s ?? "").toLowerCase();
  return k === "pendente" || k === "pending";
};
function DashboardPage() {
  const {
    data: allAccounts
  } = useSuspenseQuery(accountsQueryOptions);
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => setMounted(true), []);
  const sessionId = mounted ? getSession()?.id ?? null : null;
  const accounts = reactExports.useMemo(() => sessionId ? allAccounts.filter((a) => a.user_id === sessionId) : [], [allAccounts, sessionId]);
  const userAccountIds = reactExports.useMemo(() => new Set(accounts.map((a) => a.id)), [accounts]);
  const [selected, setSelected] = reactExports.useState("all");
  const isAll = selected === "all";
  const accountId = isAll ? void 0 : Number(selected);
  const selectedAccount = reactExports.useMemo(() => accounts.find((a) => a.id === accountId), [accounts, accountId]);
  const dashboardQuery = useQuery({
    ...accountDashboardQueryOptions(accountId ?? 0),
    enabled: !isAll && !!accountId,
    retry: false
  });
  const allDashboards = useQueries({
    queries: accounts.map((a) => ({
      ...accountDashboardQueryOptions(a.id),
      enabled: isAll,
      retry: false
    }))
  });
  const aggregated = reactExports.useMemo(() => {
    if (!isAll) return null;
    const data = allDashboards.map((q) => q.data).filter(Boolean);
    return {
      total_balance: data.reduce((s, d) => s + toNum(d.total_balance), 0),
      monthly_income: data.reduce((s, d) => s + toNum(d.monthly_income), 0),
      monthly_expenses: data.reduce((s, d) => s + toNum(d.monthly_expenses), 0)
    };
  }, [isAll, allDashboards]);
  const aggregating = isAll && allDashboards.some((q) => q.isLoading);
  const dashValues = isAll ? aggregated && {
    total_balance: aggregated.total_balance,
    monthly_income: aggregated.monthly_income,
    monthly_expenses: aggregated.monthly_expenses
  } : dashboardQuery.data && {
    total_balance: toNum(dashboardQuery.data.total_balance),
    monthly_income: toNum(dashboardQuery.data.monthly_income),
    monthly_expenses: toNum(dashboardQuery.data.monthly_expenses)
  };
  const dashLoading = isAll ? aggregating : dashboardQuery.isLoading;
  const dashError = !isAll && dashboardQuery.isError ? dashboardQuery.error : null;
  const txQuery = useQuery({
    ...transactionsQueryOptions,
    retry: false
  });
  const schedQuery = useQuery({
    ...schedulesQueryOptions,
    retry: false
  });
  const catQuery = useQuery({
    ...categoriesQueryOptions,
    retry: false
  });
  const qc = useQueryClient();
  const router = useRouter();
  const scopedTx = reactExports.useMemo(() => {
    let list = (txQuery.data ?? []).filter((t) => userAccountIds.has(t.account_id));
    if (!isAll && accountId) list = list.filter((t) => t.account_id === accountId);
    return list;
  }, [txQuery.data, userAccountIds, isAll, accountId]);
  const scopedSched = reactExports.useMemo(() => {
    let list = (schedQuery.data ?? []).filter((s) => sessionId != null && s.user_id === sessionId);
    if (!isAll && accountId) list = list.filter((s) => s.account_id === accountId);
    return list;
  }, [schedQuery.data, sessionId, isAll, accountId]);
  const pendingExpenses = reactExports.useMemo(() => {
    const tx = scopedTx.filter((t) => isPending(t.status) && t.type === "despesa").reduce((s, t) => s + toNum(t.amount), 0);
    const sc = scopedSched.filter((s) => isPending(s.status) && s.type === "despesa").reduce((acc, s) => acc + toNum(s.amount), 0);
    return tx + sc;
  }, [scopedTx, scopedSched]);
  const pendingIncome = reactExports.useMemo(() => {
    const tx = scopedTx.filter((t) => isPending(t.status) && t.type === "receita").reduce((s, t) => s + toNum(t.amount), 0);
    const sc = scopedSched.filter((s) => isPending(s.status) && s.type === "receita").reduce((acc, s) => acc + toNum(s.amount), 0);
    return tx + sc;
  }, [scopedTx, scopedSched]);
  const upcomingSchedules = reactExports.useMemo(() => [...scopedSched].filter((s) => isPending(s.status)).sort((a, b) => a.due_date > b.due_date ? 1 : a.due_date < b.due_date ? -1 : a.id - b.id).slice(0, 3), [scopedSched]);
  const recent = reactExports.useMemo(() => [...scopedTx].sort((a, b) => b.date > a.date ? 1 : b.date < a.date ? -1 : b.id - a.id).slice(0, 5), [scopedTx]);
  const [payTarget, setPayTarget] = reactExports.useState(null);
  const [payAmount, setPayAmount] = reactExports.useState("");
  const payM = useMutation({
    mutationFn: (input) => paySchedule(input.id, {
      amount: input.amount,
      payment_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
    }),
    onSuccess: () => {
      toast.success("Pagamento registrado");
      qc.invalidateQueries({
        queryKey: ["schedules"]
      });
      qc.invalidateQueries({
        queryKey: ["transactions"]
      });
      router.invalidate();
      setPayTarget(null);
      setPayAmount("");
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl", children: isAll ? "Dashboard" : `Dados ${selectedAccount?.bank ?? ""}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Aqui está sua visão geral financeira de hoje." })
      ] }),
      accounts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-64", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs uppercase tracking-wide text-muted-foreground", children: "Conta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selected, onValueChange: setSelected, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Todas as contas" }),
            accounts.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(a.id), children: [
              a.bank,
              " · ",
              a.account_number
            ] }, a.id))
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contas", className: "text-sm text-accent hover:underline", children: "Cadastre uma conta" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "overview", className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "overview", children: "Visão geral" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "reports", children: "Relatórios" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "overview", className: "space-y-10", children: [
        dashError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card/70 p-6 text-sm text-muted-foreground ring-1 ring-white/5", children: [
          "Não foi possível carregar o dashboard desta conta: ",
          dashError.message
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "Saldo Total", value: dashValues?.total_balance ?? 0, tone: (dashValues?.total_balance ?? 0) < 0 ? "destructive" : "success", loading: dashLoading }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "Renda (este mês)", value: dashValues?.monthly_income ?? 0, tone: "neutral", loading: dashLoading }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "Despesas (este mês)", value: dashValues?.monthly_expenses ?? 0, tone: "destructive", loading: dashLoading })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "Valores a pagar", value: pendingExpenses, tone: "warning", loading: txQuery.isLoading }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(KpiCard, { label: "Valores a receber", value: pendingIncome, tone: "warning", loading: txQuery.isLoading })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-end justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Próximos pagamentos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/agendamentos", className: "text-sm text-accent hover:underline", children: "Ver agendamentos" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 rounded-2xl bg-card/60 p-4 ring-1 ring-white/5", children: schedQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-sm text-muted-foreground", children: "…" }) : upcomingSchedules.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-sm text-muted-foreground", children: "Nenhum agendamento pendente." }) : upcomingSchedules.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(ScheduleRow, { s, categories: catQuery.data ?? [], onPay: (sch) => {
            setPayTarget(sch);
            setPayAmount(String(sch.amount ?? ""));
          } }, s.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-end justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl", children: "Movimentações recentes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/historico", className: "text-sm text-accent hover:underline", children: "Mostrar todos" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 rounded-2xl bg-card/60 p-4 ring-1 ring-white/5", children: txQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-sm text-muted-foreground", children: "…" }) : txQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-sm text-destructive", children: txQuery.error.message }) : recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-sm text-muted-foreground", children: "Nenhuma movimentação registrada." }) : recent.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TransactionRow, { t, accounts }, t.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "reports", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReportsTab, { transactions: scopedTx, accounts, categories: catQuery.data ?? [] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!payTarget, onOpenChange: (o) => {
      if (!o) {
        setPayTarget(null);
        setPayAmount("");
      }
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Registrar pagamento" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        const amount = Number(payAmount);
        if (!payTarget) return;
        if (!Number.isFinite(amount) || amount <= 0) {
          toast.error("Informe um valor válido");
          return;
        }
        payM.mutate({
          id: payTarget.id,
          amount
        });
      }, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium leading-none", children: "Valor pago (R$)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", min: "0", autoFocus: true, value: payAmount, onChange: (e) => setPayAmount(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: payM.isPending, className: "w-full font-display uppercase tracking-wide", children: payM.isPending ? "Registrando..." : "Confirmar pagamento" })
      ] })
    ] }) })
  ] });
}
function KpiCard({
  label,
  value,
  tone,
  loading
}) {
  const color = tone === "success" ? "text-[oklch(0.85_0.25_140)]" : tone === "destructive" ? "text-[oklch(0.7_0.25_25)]" : tone === "warning" ? "text-yellow-300" : "text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card/70 p-6 ring-1 ring-white/5 backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-3 font-display text-3xl sm:text-4xl ${color}`, children: loading ? "…" : `R$ ${formatBRL(value)}` })
  ] });
}
function TransactionRow({
  t,
  accounts
}) {
  const isIncome = t.type === "receita";
  const acc = accounts.find((a) => a.id === t.account_id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-xl bg-card/80 px-4 py-3 ring-1 ring-white/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-display text-lg", children: t.description || `Transação #${t.id}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TypeBadge, { type: t.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: t.status }),
        acc && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: accountLabel(acc) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(t.date).toLocaleDateString("pt-BR") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `font-display text-base ${isIncome ? "text-[oklch(0.85_0.25_140)]" : "text-[oklch(0.7_0.25_25)]"}`, children: [
      "R$ ",
      formatBRL(t.amount)
    ] })
  ] });
}
function ScheduleRow({
  s,
  categories,
  onPay
}) {
  const isIncome = s.type === "receita";
  const cat = categories.find((c) => c.id === s.category_id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-xl bg-card/80 px-4 py-3 ring-1 ring-white/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-display text-lg", children: s.description || `Agendamento #${s.id}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TypeBadge, { type: s.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: s.status }),
        cat && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Vence em ",
          new Date(s.due_date).toLocaleDateString("pt-BR")
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `font-display text-base ${isIncome ? "text-[oklch(0.85_0.25_140)]" : "text-[oklch(0.7_0.25_25)]"}`, children: [
      "R$ ",
      formatBRL(s.amount)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => onPay(s), className: "border-green-500/40 bg-green-500/10 text-green-300 hover:bg-green-500/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1 h-4 w-4" }),
      " Pago"
    ] })
  ] });
}
export {
  TransactionRow,
  DashboardPage as component
};
