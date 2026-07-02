import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { b as useSuspenseQuery, u as useQueryClient, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as getSession, D as Dialog, f as DialogTrigger, B as Button, h as DialogContent, i as DialogHeader, j as DialogTitle, m as formatBRL, a as accountsQueryOptions, x as accountSchema, y as createAccount, z as deleteAccount } from "./router-HQqh2RWn.mjs";
import { I as Input } from "./input-D3-I1JTw.mjs";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-GkGQBWAS.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-ZzkZGiOr.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-DNR7YqZm.mjs";
import { P as Plus, g as Pencil, f as Trash2 } from "../_libs/lucide-react.mjs";
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
function AccountsPage() {
  const {
    data: allAccounts
  } = useSuspenseQuery(accountsQueryOptions);
  const qc = useQueryClient();
  const router = useRouter();
  const [open, setOpen] = reactExports.useState(false);
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => setMounted(true), []);
  const session = mounted ? getSession() : null;
  const accounts = session?.id ? allAccounts.filter((a) => a.user_id === session.id) : [];
  const form = useForm({
    resolver: u(accountSchema),
    defaultValues: {
      user_id: session?.id ?? 1,
      bank: "",
      branch: "",
      account_number: "",
      account_type: "corrente",
      balance: 0
    }
  });
  reactExports.useEffect(() => {
    if (session?.id) form.setValue("user_id", session.id);
  }, [session?.id, form]);
  const createM = useMutation({
    mutationFn: (v) => {
      const current = getSession();
      if (!current?.id) throw new Error("Faça login novamente");
      return createAccount({
        ...v,
        user_id: current.id
      });
    },
    onSuccess: () => {
      toast.success("Conta criada");
      form.reset({
        ...form.getValues(),
        bank: "",
        branch: "",
        account_number: "",
        balance: 0
      });
      qc.invalidateQueries({
        queryKey: ["accounts"]
      });
      router.invalidate();
      setOpen(false);
    },
    onError: (e) => toast.error(e.message)
  });
  const delM = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Conta removida");
      qc.invalidateQueries({
        queryKey: ["accounts"]
      });
      router.invalidate();
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl", children: "Contas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Gerencie suas contas bancárias." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "font-display uppercase tracking-wide", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
          " Nova conta"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Nova conta bancária" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit((v) => createM.mutate(v)), className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "bank", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Banco" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Banco do Brasil", ...field }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "branch", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Filial" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "0001", ...field }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "account_number", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Número da Conta" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "12345-6", ...field }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "account_type", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Tipo de Conta" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: field.onChange, value: field.value, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "corrente", children: "Corrente" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "poupanca", children: "Poupança" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "salario", children: "Salário" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "balance", render: ({
                field
              }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Saldo da Conta (R$)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.01", ...field }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: createM.isPending, className: "font-display uppercase tracking-wide", children: createM.isPending ? "Criando..." : "Criar" })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      accounts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full rounded-2xl bg-card/70 p-8 text-center text-sm text-muted-foreground ring-1 ring-white/5", children: "Nenhuma conta cadastrada." }),
      accounts.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card/70 p-5 ring-1 ring-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-[#a3ff3d] shadow-[0_0_8px_#a3ff3d]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl", children: a.bank })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: true, className: "rounded-full bg-accent/30 px-3 py-1 text-xs text-accent opacity-60", title: "Edição via API indisponível", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "mr-1 inline h-3 w-3" }),
            " Editar conta"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Tipo", value: a.account_type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Filial", value: a.branch }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Nº conta", value: a.account_number })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Saldo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `font-display text-2xl ${Number(a.balance) < 0 ? "text-destructive" : "text-[oklch(0.85_0.25_140)]"}`, children: [
              "R$ ",
              formatBRL(a.balance)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Excluir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Excluir conta?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                  "Conta ",
                  a.bank,
                  " ",
                  a.account_number,
                  " será removida."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancelar" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => delM.mutate(a.id), children: "Excluir" })
              ] })
            ] })
          ] })
        ] })
      ] }, a.id))
    ] })
  ] });
}
function Info({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm", children: value })
  ] });
}
export {
  AccountsPage as component
};
