import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useSuspenseQuery, u as useQueryClient, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as categoriesQueryOptions, a as accountsQueryOptions, g as getSession, D as Dialog, f as DialogTrigger, B as Button, h as DialogContent, i as DialogHeader, j as DialogTitle, T as TypeBadge, m as formatBRL, J as schedulesQueryOptions, K as scheduleSchema, l as accountLabel, C as CategoryCombobox, L as createSchedule, O as updateSchedule, M as deleteSchedule, N as paySchedule } from "./router-HQqh2RWn.mjs";
import { I as Input } from "./input-D3-I1JTw.mjs";
import { T as Textarea } from "./textarea-o_czSaIo.mjs";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-GkGQBWAS.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-ZzkZGiOr.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-DNR7YqZm.mjs";
import { P as Plus, e as Check, f as Trash2, j as TriangleAlert, g as Pencil } from "../_libs/lucide-react.mjs";
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
const todayISO = () => {
  const d = /* @__PURE__ */ new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
};
const isPastDate = (iso) => !!iso && iso < todayISO();
function ScheduleFormFields({
  form,
  accounts,
  categories,
  sessionUserId
}) {
  const dueDate = form.watch("due_date");
  const past = isPastDate(dueDate);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "account_id", render: ({
        field
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { className: "sm:col-span-2", children: [
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
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Categoria" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryCombobox, { categories, value: field.value, onChange: field.onChange, currentUserId: sessionUserId }) }),
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "due_date", render: ({
        field
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Vencimento" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", ...field }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "description", render: ({
        field
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Descrição (opcional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, ...field, value: field.value ?? "" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
      ] }) })
    ] }),
    past && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        "Esta data de vencimento já passou. Cadastre uma",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/transacoes", className: "underline font-semibold", children: "transação" }),
        " ",
        "em vez de um agendamento."
      ] })
    ] })
  ] });
}
function EditDialog({
  schedule,
  accounts,
  categories,
  sessionUserId
}) {
  const [open, setOpen] = reactExports.useState(false);
  const qc = useQueryClient();
  const router = useRouter();
  const form = useForm({
    resolver: u(scheduleSchema),
    defaultValues: {
      user_id: schedule.user_id,
      account_id: schedule.account_id,
      category_id: schedule.category_id,
      type: schedule.type,
      amount: Number(schedule.amount),
      due_date: schedule.due_date.slice(0, 10),
      description: schedule.description ?? "",
      status: schedule.status
    }
  });
  const dueDate = form.watch("due_date");
  const past = isPastDate(dueDate);
  const m = useMutation({
    mutationFn: (v) => updateSchedule(schedule.id, v),
    onSuccess: () => {
      toast.success("Agendamento atualizado");
      qc.invalidateQueries({
        queryKey: ["schedules"]
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
        "Editar agendamento #",
        schedule.id
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit((v) => m.mutate(v)), className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScheduleFormFields, { form, accounts, categories, sessionUserId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: m.isPending || past, children: m.isPending ? "Salvando..." : "Salvar alterações" })
      ] }) })
    ] })
  ] });
}
function SchedulesPage() {
  const {
    data: allSchedules
  } = useSuspenseQuery(schedulesQueryOptions);
  const {
    data: allCategories = []
  } = useSuspenseQuery({
    ...categoriesQueryOptions,
    retry: false
  });
  const {
    data: allAccounts = []
  } = useSuspenseQuery({
    ...accountsQueryOptions,
    retry: false
  });
  const qc = useQueryClient();
  const router = useRouter();
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => setMounted(true), []);
  const session = mounted ? getSession() : null;
  const sessionUserId = session?.id ?? null;
  const accounts = sessionUserId != null ? allAccounts.filter((a) => a.user_id === sessionUserId) : [];
  const categories = allCategories.filter((c) => c.user_id == null || sessionUserId != null && c.user_id === sessionUserId);
  const schedules = sessionUserId ? allSchedules.filter((s) => s.user_id === sessionUserId && String(s.status).toLowerCase() !== "pago") : [];
  const form = useForm({
    resolver: u(scheduleSchema),
    defaultValues: {
      user_id: session?.id ?? 1,
      account_id: 0,
      category_id: 0,
      type: "despesa",
      amount: 0,
      due_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      description: "",
      status: "pending"
    }
  });
  reactExports.useEffect(() => {
    if (session?.id) form.setValue("user_id", session.id);
    if (!form.getValues("account_id") && accounts[0]?.id) {
      form.setValue("account_id", accounts[0].id);
    }
  }, [session?.id, accounts, form]);
  const dueDate = form.watch("due_date");
  const past = isPastDate(dueDate);
  const createM = useMutation({
    mutationFn: (v) => {
      const current = getSession();
      if (!current?.id) throw new Error("Faça login novamente");
      return createSchedule({
        ...v,
        user_id: current.id,
        status: "pending"
      });
    },
    onSuccess: () => {
      toast.success("Agendamento criado");
      form.reset({
        ...form.getValues(),
        amount: 0,
        description: ""
      });
      qc.invalidateQueries({
        queryKey: ["schedules"]
      });
      router.invalidate();
      setCreateOpen(false);
    },
    onError: (e) => toast.error(e.message)
  });
  const delM = useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      toast.success("Agendamento removido");
      qc.invalidateQueries({
        queryKey: ["schedules"]
      });
      router.invalidate();
    },
    onError: (e) => toast.error(e.message)
  });
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Agendamentos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Receitas e despesas programadas." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: createOpen, onOpenChange: setCreateOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "font-display uppercase tracking-wide", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
          " Criar Agendamento"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Novo agendamento" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit((v) => createM.mutate(v)), className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScheduleFormFields, { form, accounts, categories, sessionUserId }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: createM.isPending || past, className: "font-display uppercase tracking-wide", children: createM.isPending ? "Criando..." : "Criar" })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      schedules.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card/70 p-8 text-center text-sm text-muted-foreground ring-1 ring-white/5", children: "Nenhum agendamento cadastrado." }),
      schedules.map((s) => {
        const cat = allCategories.find((c) => c.id === s.category_id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-2xl bg-card/70 p-4 ring-1 ring-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg", children: s.description || `Agendamento #${s.id}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TypeBadge, { type: s.type }),
              cat && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "· ",
                cat.name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "· Vence em",
                " ",
                mounted ? new Date(s.due_date).toLocaleDateString("pt-BR") : s.due_date.slice(0, 10)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `font-display text-xl ${s.type === "receita" ? "text-[oklch(0.85_0.25_140)]" : "text-[oklch(0.7_0.25_25)]"}`, children: [
            "R$ ",
            formatBRL(s.amount)
          ] }),
          String(s.status).toLowerCase() !== "pago" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => {
            setPayTarget(s);
            setPayAmount(String(s.amount ?? ""));
          }, className: "border-green-500/40 bg-green-500/10 text-green-300 hover:bg-green-500/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1 h-4 w-4" }),
            " Pago"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(EditDialog, { schedule: s, accounts, categories, sessionUserId }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Excluir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Excluir agendamento?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                  "O item #",
                  s.id,
                  " será removido."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancelar" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => delM.mutate(s.id), children: "Excluir" })
              ] })
            ] })
          ] })
        ] }, s.id);
      })
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
export {
  SchedulesPage as component
};
