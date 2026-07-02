import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as useQuery, u as useQueryClient, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as categoriesQueryOptions, g as getSession, D as Dialog, f as DialogTrigger, B as Button, h as DialogContent, i as DialogHeader, j as DialogTitle, k as Badge, A as createCategory, G as deleteCategory, E as updateCategory } from "./router-HQqh2RWn.mjs";
import { I as Input } from "./input-D3-I1JTw.mjs";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-GkGQBWAS.mjs";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-DNR7YqZm.mjs";
import { P as Plus, g as Pencil, f as Trash2 } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
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
import "../_libs/radix-ui__react-alert-dialog.mjs";
const formSchema = objectType({
  name: stringType().min(1, "Nome obrigatório"),
  description: stringType().optional()
});
function CategoriesPage() {
  const {
    data: all,
    isLoading,
    error
  } = useQuery({
    ...categoriesQueryOptions,
    retry: false
  });
  const qc = useQueryClient();
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => setMounted(true), []);
  const session = mounted ? getSession() : null;
  const visible = (all ?? []).filter((c) => session?.id ? c.user_id === session.id || c.user_id == null && c.is_default : c.user_id == null && c.is_default);
  const [openCreate, setOpenCreate] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const createForm = useForm({
    resolver: u(formSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  });
  const editForm = useForm({
    resolver: u(formSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  });
  reactExports.useEffect(() => {
    if (editing) {
      editForm.reset({
        name: editing.name,
        description: editing.description ?? ""
      });
    }
  }, [editing, editForm]);
  const createM = useMutation({
    mutationFn: (data) => {
      if (!session?.id) throw new Error("Faça login");
      return createCategory({
        user_id: session.id,
        name: data.name,
        description: data.description || null
      });
    },
    onSuccess: () => {
      toast.success("Categoria criada");
      qc.invalidateQueries({
        queryKey: ["categories"]
      });
      createForm.reset({
        name: "",
        description: ""
      });
      setOpenCreate(false);
    },
    onError: (e) => toast.error(e.message)
  });
  const updateM = useMutation({
    mutationFn: (data) => {
      if (!editing) throw new Error("Sem categoria");
      return updateCategory(editing.id, {
        name: data.name,
        description: data.description || null
      });
    },
    onSuccess: () => {
      toast.success("Categoria atualizada");
      qc.invalidateQueries({
        queryKey: ["categories"]
      });
      setEditing(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const delM = useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () => {
      toast.success("Categoria excluída");
      qc.invalidateQueries({
        queryKey: ["categories"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Gerenciar Categorias" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Categorias padrão não podem ser editadas ou excluídas." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: openCreate, onOpenChange: setOpenCreate, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Nova categoria"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Nova categoria" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...createForm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: createForm.handleSubmit((d) => createM.mutate(d)), className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: createForm.control, name: "name", render: ({
              field
            }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Nome" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: createForm.control, name: "description", render: ({
              field
            }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Descrição" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: createM.isPending, className: "w-full", children: createM.isPending ? "Criando..." : "Criar" })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-white/10 bg-card p-6 text-sm text-muted-foreground", children: "Carregando..." }),
      error && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-sm text-destructive", children: [
        "Não foi possível carregar as categorias: ",
        error.message
      ] }),
      !isLoading && !error && visible.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-white/10 bg-card p-6 text-sm text-muted-foreground", children: "Nenhuma categoria." }),
      visible.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-white/10 bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: c.name }),
            c.is_default && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "uppercase", children: "Padrão" })
          ] }),
          c.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: c.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", disabled: c.is_default, onClick: () => setEditing(c), className: "gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
            " Editar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", disabled: c.is_default, className: "gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
              " Excluir"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Excluir categoria?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Esta ação não pode ser desfeita." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancelar" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => delM.mutate(c.id), children: "Excluir" })
              ] })
            ] })
          ] })
        ] })
      ] }, c.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editing, onOpenChange: (o) => !o && setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Editar categoria" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...editForm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: editForm.handleSubmit((d) => updateM.mutate(d)), className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: editForm.control, name: "name", render: ({
          field
        }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Nome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: editForm.control, name: "description", render: ({
          field
        }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Descrição" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: updateM.isPending, className: "w-full", children: updateM.isPending ? "Salvando..." : "Salvar" })
      ] }) })
    ] }) })
  ] });
}
export {
  CategoriesPage as component
};
