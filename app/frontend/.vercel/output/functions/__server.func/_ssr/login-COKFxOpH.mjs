import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { F as Field, r as loginSchema, s as login, v as saveSession } from "./router-HQqh2RWn.mjs";
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
import "../_libs/zod.mjs";
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
import "../_libs/lucide-react.mjs";
function LoginPage() {
  const router = useRouter();
  const form = useForm({
    resolver: u(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const m = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      saveSession(user);
      toast.success(`Bem-vindo, ${user.name}!`);
      router.navigate({
        to: "/"
      });
      router.invalidate();
    },
    onError: (e) => toast.error(e.message || "Falha no login")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen w-full bg-diamond-frame flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-lavender bg-triangles-soft p-8 sm:p-12 shadow-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit((v) => m.mutate(v)), className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl sm:text-6xl text-lavender-foreground text-center", children: "Login" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-lavender-foreground/80", children: [
      "Não tem conta?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cadastro", className: "font-semibold text-white underline-offset-2 hover:underline", children: "Cadastre-se" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "E-mail", type: "email", placeholder: "voce@exemplo.com", autoComplete: "email", error: form.formState.errors.email?.message, ...form.register("email") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Senha", type: "password", placeholder: "••••••", autoComplete: "current-password", error: form.formState.errors.password?.message, ...form.register("password") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: m.isPending, className: "btn-chunky w-full mt-2 active:translate-y-[2px] disabled:opacity-60", children: m.isPending ? "Entrando..." : "Entrar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/recuperar-senha", className: "text-lavender-foreground/80 underline-offset-2 hover:underline", children: "Esqueci minha senha" }) })
  ] }) }) });
}
export {
  LoginPage as component
};
