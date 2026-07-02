import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { b as useSuspenseQuery, u as useQueryClient, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as transactionsQueryOptions, a as accountsQueryOptions, c as categoriesQueryOptions, g as getSession, D as Dialog, f as DialogTrigger, B as Button, h as DialogContent, i as DialogHeader, j as DialogTitle, T as TypeBadge, S as StatusBadge, k as Badge, l as accountLabel, m as formatBRL, b as transactionSchema, C as CategoryCombobox, d as createTransaction, u as updateTransaction, e as deleteTransaction } from "./router-HQqh2RWn.mjs";
import { I as Input } from "./input-D3-I1JTw.mjs";
import { T as Textarea } from "./textarea-o_czSaIo.mjs";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-GkGQBWAS.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-ZzkZGiOr.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-DNR7YqZm.mjs";
import { P as Plus, f as Trash2, g as Pencil } from "../_libs/lucide-react.mjs";
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
import "../_libs/zod.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
function TransactionFormFields({
  form,
  accounts,
  categories,
  currentUserId
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "account_id", render: ({
      field
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Conta" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: (v) => field.onChange(Number(v)), value: field.value ? String(field.value) : "", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Selecionar conta..." }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          accounts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1.5 text-sm text-muted-foreground", children: "Nenhuma conta cadastrada" }),
          accounts.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(a.id), children: accountLabel(a) }, a.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "category_id", render: ({
      field
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Categoria" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryCombobox, { categories, value: field.value, onChange: field.onChange, currentUserId }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "type", render: ({
      field
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Tipo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: field.onChange, value: field.value, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "receita", children: "Receita" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "despesa", children: "Despesa" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "amount", render: ({
      field
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Valor (R$)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", ...field }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "date", render: ({
      field
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Data" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", ...field }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "schedule_id", render: ({
      field
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "ID do agendamento (opcional)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "1", value: field.value ?? "", onChange: (e) => field.onChange(e.target.value === "" ? null : Number(e.target.value)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "description", render: ({
      field
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { className: "sm:col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Descrição (opcional)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, ...field, value: field.value ?? "" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
    ] }) })
  ] });
}
function EditDialog({
  tx,
  accounts,
  categories,
  currentUserId
}) {
  const [open, setOpen] = reactExports.useState(false);
  const qc = useQueryClient();
  const router = useRouter();
  const form = useForm({
    resolver: u(transactionSchema),
    defaultValues: {
      account_id: tx.account_id,
      category_id: tx.category_id,
      schedule_id: tx.schedule_id ?? null,
      type: tx.type,
      amount: Number(tx.amount),
      date: tx.date.slice(0, 10),
      description: tx.description ?? "",
      status: tx.status
    }
  });
  const m = useMutation({
    mutationFn: (v) => updateTransaction(tx.id, v),
    onSuccess: () => {
      toast.success("Transação atualizada");
      qc.invalidateQueries({
        queryKey: ["transactions"]
      });
      router.invalidate();
      setOpen(false);
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Editar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "Editar transação #",
        tx.id
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit((v) => m.mutate(v)), className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TransactionFormFields, { form, accounts, categories, currentUserId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: m.isPending, children: m.isPending ? "Salvando..." : "Salvar alterações" })
      ] }) })
    ] })
  ] });
}
function TransactionsPage() {
  const {
    data: allTransactions = [],
    error
  } = useSuspenseQuery({
    ...transactionsQueryOptions,
    retry: false
  });
  const {
    data: allAccounts = []
  } = useSuspenseQuery({
    ...accountsQueryOptions,
    retry: false
  });
  const {
    data: allCategories = []
  } = useSuspenseQuery({
    ...categoriesQueryOptions,
    retry: false
  });
  const sessionId = getSession()?.id;
  const [dateMode, setDateMode] = reactExports.useState("month");
  const [period, setPeriod] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const accounts = sessionId != null ? allAccounts.filter((a) => a.user_id === sessionId) : [];
  const userAccountIds = new Set(accounts.map((a) => a.id));
  const scopedTx = allTransactions.filter((t) => userAccountIds.has(t.account_id));
  const byPeriod = period === "all" ? scopedTx : scopedTx.filter((t) => {
    const d = t.date ?? "";
    return dateMode === "month" ? d.slice(0, 7) === period : d.slice(0, 10) === period;
  });
  const term = search.trim().toLowerCase();
  const transactions = term ? byPeriod.filter((t) => {
    const desc = (t.description ?? "").toLowerCase();
    const catName = (allCategories.find((c) => c.id === t.category_id)?.name ?? "").toLowerCase();
    return desc.includes(term) || catName.includes(term);
  }) : byPeriod;
  const categories = allCategories.filter((c) => c.user_id == null || sessionId != null && c.user_id === sessionId);
  const qc = useQueryClient();
  const router = useRouter();
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => setMounted(true), []);
  const form = useForm({
    resolver: u(transactionSchema),
    defaultValues: {
      account_id: accounts[0]?.id ?? 0,
      category_id: categories[0]?.id ?? 0,
      schedule_id: null,
      type: "despesa",
      amount: 0,
      date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      description: "",
      status: "completed"
    }
  });
  reactExports.useEffect(() => {
    if (!form.getValues("account_id") && accounts[0]?.id) {
      form.setValue("account_id", accounts[0].id);
    }
    if (!form.getValues("category_id") && categories[0]?.id) {
      form.setValue("category_id", categories[0].id);
    }
  }, [accounts, categories, form]);
  const createM = useMutation({
    mutationFn: (v) => {
      const current = getSession();
      if (!current?.id) throw new Error("Faça login novamente");
      return createTransaction({
        ...v,
        status: "completed"
      });
    },
    onSuccess: () => {
      toast.success("Transação criada");
      form.reset({
        ...form.getValues(),
        amount: 0,
        description: ""
      });
      qc.invalidateQueries({
        queryKey: ["transactions"]
      });
      router.invalidate();
      setCreateOpen(false);
    },
    onError: (e) => toast.error(e.message)
  });
  const delM = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      toast.success("Transação removida");
      qc.invalidateQueries({
        queryKey: ["transactions"]
      });
      router.invalidate();
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Transações" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Movimentações financeiras registradas." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: createOpen, onOpenChange: setCreateOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "font-display uppercase tracking-wide", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
          " Criar Transação"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Nova transação" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit((v) => createM.mutate(v)), className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TransactionFormFields, { form, accounts, categories, currentUserId: sessionId ?? null }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: createM.isPending, className: "font-display uppercase tracking-wide", children: createM.isPending ? "Criando..." : "Criar" })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-3 rounded-2xl bg-card/60 p-4 ring-1 ring-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Buscar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "search", placeholder: "Descrição ou categoria...", value: search, onChange: (e) => setSearch(e.target.value), className: "w-64" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Filtrar por" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: dateMode, onValueChange: (v) => {
          setDateMode(v);
          setPeriod(v === "month" ? (/* @__PURE__ */ new Date()).toISOString().slice(0, 7) : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "month", children: "Mês" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "day", children: "Dia" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: dateMode === "month" ? "Mês" : "Data" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: dateMode === "month" ? "month" : "date", value: period === "all" ? "" : period, onChange: (e) => setPeriod(e.target.value || "all"), className: "w-44" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: period === "all" ? "default" : "outline", size: "sm", onClick: () => setPeriod("all"), children: "Todos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: () => {
        setDateMode("month");
        setPeriod((/* @__PURE__ */ new Date()).toISOString().slice(0, 7));
      }, children: "Mês atual" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: () => {
        setDateMode("day");
        setPeriod((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
      }, children: "Hoje" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-sm text-muted-foreground", children: [
        transactions.length,
        " ",
        transactions.length === 1 ? "transação" : "transações"
      ] })
    ] }),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card/70 p-6 text-sm text-muted-foreground ring-1 ring-white/5", children: [
      "Não foi possível carregar a lista de transações: ",
      String(error.message)
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      transactions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card/70 p-8 text-center text-sm text-muted-foreground ring-1 ring-white/5", children: "Nenhuma transação cadastrada." }),
      transactions.map((t) => {
        const acc = accounts.find((a) => a.id === t.account_id);
        const cat = allCategories.find((c) => c.id === t.category_id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-2xl bg-card/70 p-4 ring-1 ring-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg", children: t.description || `Transação #${t.id}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TypeBadge, { type: t.type }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: t.status }),
              cat && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: cat.name }),
              acc && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: accountLabel(acc) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mounted ? new Date(t.date).toLocaleDateString("pt-BR") : t.date.slice(0, 10) })
            ] })
          ] }),
          (() => {
            const pending = String(t.status ?? "").toLowerCase() === "pendente" || String(t.status ?? "").toLowerCase() === "pending";
            const hide = pending && t.type === "despesa";
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-display text-xl ${t.type === "receita" ? "text-[oklch(0.85_0.25_140)]" : "text-[oklch(0.7_0.25_25)]"}`, children: hide ? "—" : `R$ ${formatBRL(t.amount)}` });
          })(),
          /* @__PURE__ */ jsxRuntimeExports.jsx(EditDialog, { tx: t, accounts, categories, currentUserId: sessionId ?? null }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Excluir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Excluir transação?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                  "O item #",
                  t.id,
                  " será removido."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancelar" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => delM.mutate(t.id), children: "Excluir" })
              ] })
            ] })
          ] })
        ] }, t.id);
      })
    ] })
  ] });
}
export {
  TransactionsPage as component
};
