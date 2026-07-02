import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { F as Field, n as apiFetch, o as updatePassword } from "./router-HQqh2RWn.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
function RecuperarSenhaPage() {
  const router = useRouter();
  const [email, setEmail] = reactExports.useState("");
  const [user, setUser] = reactExports.useState(null);
  const [password, setPassword] = reactExports.useState("");
  const lookup = useMutation({
    mutationFn: async (e) => {
      const users = await apiFetch("/users");
      const found = users.find((u) => u.email.toLowerCase() === e.toLowerCase().trim());
      if (!found) throw new Error("E-mail não encontrado");
      return found;
    },
    onSuccess: (u) => setUser(u),
    onError: (e) => toast.error(e.message)
  });
  const save = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Usuário não carregado");
      if (password.length < 4) throw new Error("Mínimo 4 caracteres");
      await updatePassword(user.id, password);
    },
    onSuccess: () => {
      toast.success("Senha atualizada");
      router.navigate({
        to: "/login"
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen w-full bg-diamond-frame flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-lavender bg-triangles-soft p-8 sm:p-12 shadow-2xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-sm text-lavender-foreground/80 underline-offset-2 hover:underline", children: "← Voltar" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl text-lavender-foreground text-center", children: "Recuperar senha" }),
    !user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      lookup.mutate(email);
    }, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "E-mail", type: "email", placeholder: "voce@exemplo.com", value: email, onChange: (e) => setEmail(e.target.value), required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: lookup.isPending, className: "btn-chunky w-full mt-2 active:translate-y-[2px] disabled:opacity-60", children: lookup.isPending ? "Buscando..." : "Continuar" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      save.mutate();
    }, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome", value: user.name, disabled: true, readOnly: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "E-mail", value: user.email, disabled: true, readOnly: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nova senha", type: "password", placeholder: "mínimo 4 caracteres", value: password, onChange: (e) => setPassword(e.target.value), autoComplete: "new-password", required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: save.isPending, className: "btn-chunky w-full mt-2 active:translate-y-[2px] disabled:opacity-60", children: save.isPending ? "Salvando..." : "Salvar nova senha" })
    ] })
  ] }) });
}
export {
  RecuperarSenhaPage as component
};
