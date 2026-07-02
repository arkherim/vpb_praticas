import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as getSession, B as Button, n as apiFetch } from "./router-HQqh2RWn.mjs";
import { I as Input } from "./input-D3-I1JTw.mjs";
import { T as Textarea } from "./textarea-o_czSaIo.mjs";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-GkGQBWAS.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/radix-ui__react-label.mjs";
const schema = objectType({
  name: stringType().trim().min(1, "Informe seu nome").max(120),
  email: stringType().trim().email("E-mail inválido"),
  message: stringType().trim().min(1, "Descreva seu problema").max(5e3)
});
function ContatoPage() {
  const form = useForm({
    resolver: u(schema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });
  reactExports.useEffect(() => {
    const s = getSession();
    if (s) {
      form.reset({
        name: s.name ?? "",
        email: s.email ?? "",
        message: ""
      });
    }
  }, []);
  const mut = useMutation({
    mutationFn: (data) => apiFetch("/contact", {
      method: "POST",
      body: JSON.stringify(data)
    }),
    onSuccess: () => {
      toast.success("Mensagem enviada!");
      form.setValue("message", "");
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl sm:text-6xl", children: "Contate-nos" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit((v) => mut.mutate(v)), className: "mt-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "name", render: ({
        field
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "font-display text-xl", children: "Seu nome:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...field, className: "h-14 rounded-2xl bg-white/5 border-white/10" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "email", render: ({
        field
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "font-display text-xl", children: "Seu email:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", ...field, className: "h-14 rounded-2xl bg-white/5 border-white/10" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { control: form.control, name: "message", render: ({
        field
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { className: "font-display text-xl", children: "Descreva seu problema" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { ...field, rows: 6, className: "rounded-2xl bg-white/5 border-white/10" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: mut.isPending, className: "w-full h-14 rounded-lg bg-primary font-display text-2xl uppercase tracking-wider text-primary-foreground hover:bg-primary/90", children: mut.isPending ? "Enviando..." : "Enviar" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-8 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 border-t border-dashed border-primary/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg text-foreground", children: "Ou" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 border-t border-dashed border-primary/60" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl", children: "Envie um e-mail para:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-1 font-display text-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:biancaaparecidapaz26@gmail.com", className: "block hover:underline", children: "biancaaparecidapaz26@gmail.com" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:victor.lermen@unoesc.edu.br", className: "block hover:underline", children: "victor.lermen@unoesc.edu.br" })
      ] })
    ] })
  ] });
}
export {
  ContatoPage as component
};
