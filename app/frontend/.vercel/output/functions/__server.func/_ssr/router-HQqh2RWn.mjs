import { c as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, q as queryOptions, u as useQueryClient, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, b as useRouterState, O as Outlet, H as HeadContent, S as Scripts, d as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { P as Portal, C as Content2, R as Root2, T as Trigger } from "../_libs/radix-ui__react-popover.mjs";
import { _ as _e } from "../_libs/cmdk.mjs";
import { b as DialogOverlay$1, a as DialogPortal$1, c as DialogContent$1, h as DialogClose, f as DialogTitle$1, g as DialogDescription$1, D as Dialog$1, d as DialogTrigger$1 } from "../_libs/radix-ui__react-dialog.mjs";
import { M as Menu, X, L as LayoutDashboard, A as ArrowLeftRight, C as CalendarClock, W as Wallet, T as Tags, a as Mail, b as CircleUser, c as LogOut, S as Search, d as ChevronsUpDown, e as Check, P as Plus } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, c as coerce, b as booleanType } from "../_libs/zod.mjs";
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
import "../_libs/radix-ui__react-compose-refs.mjs";
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
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const DEFAULT_API_BASE = "http://localhost:8000";
const API_BASE = DEFAULT_API_BASE.replace(
  /\/+$/,
  ""
);
async function apiFetch(path, init) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const res = await fetch(`${API_BASE}${normalizedPath}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init?.headers ?? {}
    }
  });
  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      if (body?.detail) {
        msg = Array.isArray(body.detail) ? body.detail.map((d) => d.msg ?? JSON.stringify(d)).join("; ") : String(body.detail);
      }
    } catch {
    }
    throw new Error(msg);
  }
  if (res.status === 204) return void 0;
  return await res.json();
}
const userSchema = objectType({
  name: stringType().min(1, "Informe o nome"),
  email: stringType().email("E-mail inválido"),
  password: stringType().min(4, "Mínimo 4 caracteres")
});
const createUser = (data) => apiFetch("/users", { method: "POST", body: JSON.stringify(data) });
const deleteUser = (id) => apiFetch(`/users/${id}`, { method: "DELETE" });
const updatePassword = (id, password) => apiFetch(`/users/${id}/password?new_password=${encodeURIComponent(password)}`, {
  method: "PUT"
});
const loginSchema = objectType({
  email: stringType().email("E-mail inválido"),
  password: stringType().min(1, "Informe a senha")
});
const login = (data) => apiFetch("/login", {
  method: "POST",
  body: JSON.stringify(data)
});
const STORAGE_KEY = "vpb.session";
function saveSession(user) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event("vpb:session"));
  }
}
function getSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function clearSession() {
  if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
}
const appCss = "/assets/styles-BzYDKfvx.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-screen place-items-center bg-triangles px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Página não encontrada." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mt-6 inline-block rounded-lg bg-primary px-4 py-2 font-display text-primary-foreground", children: "Voltar" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-screen place-items-center bg-triangles px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl", children: "Algo deu errado" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        className: "mt-6 rounded-lg bg-primary px-4 py-2 font-display text-primary-foreground",
        children: "Tentar novamente"
      }
    )
  ] }) });
}
const Route$b = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VPB Finanças — Painel" },
      { name: "description", content: "Painel financeiro VPB com agendamentos e contas." },
      { property: "og:title", content: "VPB Finanças — Painel" },
      { name: "twitter:title", content: "VPB Finanças — Painel" },
      { property: "og:description", content: "Painel financeiro VPB com agendamentos e contas." },
      { name: "twitter:description", content: "Painel financeiro VPB com agendamentos e contas." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/752b2443-1e69-4a73-8679-49f03f2704e6/id-preview-6fac860d--e7c5b6ae-9c18-4a0e-ab8a-6c22ff872f29.lovable.app-1782161051819.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/752b2443-1e69-4a73-8679-49f03f2704e6/id-preview-6fac860d--e7c5b6ae-9c18-4a0e-ab8a-6c22ff872f29.lovable.app-1782161051819.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bowlby+One&family=Manrope:wght@400;500;600;700;800&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$b.useRouteContext();
  const router2 = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [user, setUser] = reactExports.useState(null);
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMounted(true);
    setUser(getSession());
    const onChange = () => setUser(getSession());
    window.addEventListener("storage", onChange);
    window.addEventListener("vpb:session", onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener("vpb:session", onChange);
    };
  }, []);
  const isAuthPage = pathname === "/login" || pathname === "/cadastro" || pathname === "/recuperar-senha";
  reactExports.useEffect(() => {
    if (!mounted) return;
    if (!user && !isAuthPage) {
      router2.navigate({ to: "/login" });
    } else if (user && isAuthPage) {
      router2.navigate({ to: "/" });
    }
  }, [mounted, user, isAuthPage, router2]);
  const showSidebar = mounted && !!user && !isAuthPage;
  const canRenderOutlet = isAuthPage || !!user;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    isAuthPage ? /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) : showSidebar ? /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarLayout, { user, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-triangles", children: canRenderOutlet ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl px-8 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) : null }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, theme: "dark", position: "top-right" })
  ] });
}
function SidebarLayout({ user, children }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background lg:flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-black px-4 py-3 lg:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setMobileOpen(true),
          className: "rounded-md p-2 text-foreground hover:bg-white/10",
          "aria-label": "Abrir menu",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg", children: "VPB" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, { user }) }) }),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-40 lg:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 bg-black/60",
          onClick: () => setMobileOpen(false)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 w-72 max-w-[85vw]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Sidebar,
        {
          user,
          onClose: () => setMobileOpen(false),
          showClose: true
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-w-0 flex-1 bg-triangles", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10", children }) })
  ] });
}
function Sidebar({
  user,
  onClose,
  showClose
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const initial = (user.name?.[0] ?? "U").toUpperCase();
  const handleLogout = () => {
    clearSession();
    window.dispatchEvent(new Event("vpb:session"));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "relative flex h-full w-72 shrink-0 flex-col gap-6 overflow-y-auto border-r border-white/5 bg-black px-5 py-6", children: [
    showClose && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onClose,
        className: "absolute right-3 top-3 rounded-md p-1.5 text-foreground hover:bg-white/10",
        "aria-label": "Fechar menu",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-full bg-white font-display text-lg text-black", children: initial }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Olá!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-semibold", children: user.name })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-1 flex-col gap-2 text-sm", children: [
      { to: "/", label: "Dashboard", icon: LayoutDashboard, showDot: true },
      { to: "/transacoes", label: "Transação", icon: ArrowLeftRight },
      { to: "/agendamentos", label: "Agendamento", icon: CalendarClock },
      { to: "/contas", label: "Contas Bancárias", icon: Wallet },
      { to: "/categorias", label: "Gerenciar Categorias", icon: Tags }
    ].map((item) => {
      const active = pathname === item.to;
      const Icon = item.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: item.to,
          className: `flex items-center gap-3 rounded-full px-4 py-2.5 font-semibold transition ${active ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(168,38,168,0.55)]" : "bg-primary/15 text-foreground hover:bg-primary/25"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 shrink-0 opacity-80" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: item.label })
          ]
        },
        item.to
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 border-t border-white/5 pt-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/contato",
          className: `flex items-center gap-2 rounded-full px-3 py-2 ${pathname === "/contato" ? "bg-primary/20 text-foreground" : "text-muted-foreground hover:text-foreground"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "underline-offset-2 hover:underline", children: "Contate-nos" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/perfil",
          className: `flex items-center gap-2 rounded-full px-3 py-2 ${pathname === "/perfil" ? "bg-primary/20 text-foreground" : "text-muted-foreground hover:text-foreground"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUser, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "underline-offset-2 hover:underline", children: "Acessar perfil" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleLogout,
          className: "flex w-full items-center gap-2 px-3 py-2 text-left text-muted-foreground hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "underline-offset-2 hover:underline", children: "Encerrar Sessão" })
          ]
        }
      )
    ] })
  ] });
}
const $$splitNotFoundComponentImporter = () => import("./transacoes-D_CfPA2J.mjs");
const $$splitErrorComponentImporter$5 = () => import("./transacoes-BrTv9vw1.mjs");
const $$splitComponentImporter$a = () => import("./transacoes-BrennE_7.mjs");
const Route$a = createFileRoute("/transacoes")({
  head: () => ({
    meta: [{
      title: "Transações — VPB"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$5, "errorComponent"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const $$splitComponentImporter$9 = () => import("./recuperar-senha-ByyqnJLD.mjs");
const Route$9 = createFileRoute("/recuperar-senha")({
  head: () => ({
    meta: [{
      title: "Recuperar senha — VPB"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./perfil-CZZuNvZZ.mjs");
const Route$8 = createFileRoute("/perfil")({
  head: () => ({
    meta: [{
      title: "Sua Conta — VPB"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./login-COKFxOpH.mjs");
const Route$7 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Entrar — VPB"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const Field = function Field2({
  label,
  error,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label-chunky", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...props, className: "input-chunky focus:input-chunky-focus" }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-medium text-red-700", children: error })
  ] });
};
const transactionSchema = objectType({
  account_id: coerce.number().int().positive("Conta obrigatória"),
  category_id: coerce.number().int().positive("Categoria obrigatória"),
  schedule_id: coerce.number().int().positive().optional().nullable(),
  type: stringType().min(1),
  amount: coerce.number(),
  date: stringType().min(1, "Data obrigatória"),
  description: stringType().optional().nullable(),
  status: stringType().min(1)
});
const transactionsQueryOptions = queryOptions({
  queryKey: ["transactions"],
  queryFn: () => apiFetch("/transactions")
});
const serialize = (data) => ({
  ...data,
  amount: data.amount !== void 0 ? String(data.amount) : void 0,
  schedule_id: data.schedule_id === void 0 || data.schedule_id === null ? null : Number(data.schedule_id)
});
const createTransaction = (data) => apiFetch("/transactions", {
  method: "POST",
  body: JSON.stringify(serialize(data))
});
const updateTransaction = (id, data) => apiFetch(`/transactions/${id}`, {
  method: "PATCH",
  body: JSON.stringify(serialize(data))
});
const deleteTransaction = (id) => apiFetch(`/transactions/${id}`, { method: "DELETE" });
const accountSchema = objectType({
  user_id: coerce.number().int().positive("ID do usuário obrigatório"),
  bank: stringType().min(1, "Banco obrigatório"),
  branch: stringType().min(1, "Agência obrigatória"),
  account_number: stringType().min(1, "Número obrigatório"),
  account_type: stringType().min(1, "Tipo obrigatório"),
  balance: coerce.number()
});
const accountsQueryOptions = queryOptions({
  queryKey: ["accounts"],
  queryFn: () => apiFetch("/accounts")
});
const accountDashboardQueryOptions = (accountId) => queryOptions({
  queryKey: ["accounts", accountId, "dashboard"],
  queryFn: () => apiFetch(`/accounts/${accountId}/dashboard`)
});
const createAccount = (data) => apiFetch("/accounts", {
  method: "POST",
  body: JSON.stringify({ ...data, balance: String(data.balance) })
});
const deleteAccount = (id) => apiFetch(`/accounts/${id}`, { method: "DELETE" });
const $$splitErrorComponentImporter$4 = () => import("./historico-BrTv9vw1.mjs");
const $$splitComponentImporter$6 = () => import("./historico-dhwUNEgU.mjs");
const Route$6 = createFileRoute("/historico")({
  head: () => ({
    meta: [{
      title: "Histórico — VPB"
    }]
  }),
  loader: ({
    context
  }) => Promise.all([context.queryClient.ensureQueryData(transactionsQueryOptions), context.queryClient.ensureQueryData(accountsQueryOptions)]),
  component: lazyRouteComponent($$splitComponentImporter$6, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$4, "errorComponent")
});
const $$splitComponentImporter$5 = () => import("./contato-DdONY2Wo.mjs");
const Route$5 = createFileRoute("/contato")({
  head: () => ({
    meta: [{
      title: "Contate-nos — VPB"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
objectType({
  name: stringType().trim().min(1, "Informe seu nome").max(120),
  email: stringType().trim().email("E-mail inválido"),
  message: stringType().trim().min(1, "Descreva seu problema").max(5e3)
});
const $$splitErrorComponentImporter$3 = () => import("./contas-BrTv9vw1.mjs");
const $$splitComponentImporter$4 = () => import("./contas-Ced9tjKL.mjs");
const Route$4 = createFileRoute("/contas")({
  head: () => ({
    meta: [{
      title: "Contas — VPB"
    }]
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(accountsQueryOptions),
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$3, "errorComponent")
});
const $$splitErrorComponentImporter$2 = () => import("./categorias-BYeV2nt9.mjs");
const $$splitComponentImporter$3 = () => import("./categorias-DyKLNzgt.mjs");
const Route$3 = createFileRoute("/categorias")({
  head: () => ({
    meta: [{
      title: "Categorias — VPB"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$2, "errorComponent")
});
objectType({
  name: stringType().min(1, "Nome obrigatório"),
  description: stringType().optional()
});
const $$splitComponentImporter$2 = () => import("./cadastro-BUBB9lsb.mjs");
const Route$2 = createFileRoute("/cadastro")({
  head: () => ({
    meta: [{
      title: "Cadastro — VPB"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const scheduleSchema = objectType({
  user_id: coerce.number().int().positive(),
  account_id: coerce.number().int().positive("Selecione uma conta"),
  category_id: coerce.number().int().positive("Selecione uma categoria"),
  type: stringType().min(1),
  amount: coerce.number(),
  due_date: stringType().min(1, "Data obrigatória"),
  description: stringType().optional().nullable(),
  status: stringType().min(1)
});
const schedulesQueryOptions = queryOptions({
  queryKey: ["schedules"],
  queryFn: () => apiFetch("/schedules")
});
const createSchedule = (data) => apiFetch("/schedules", {
  method: "POST",
  body: JSON.stringify({ ...data, amount: String(data.amount) })
});
const updateSchedule = (id, data) => apiFetch(`/schedules/${id}`, {
  method: "PATCH",
  body: JSON.stringify({
    ...data,
    amount: data.amount !== void 0 ? String(data.amount) : void 0
  })
});
const deleteSchedule = (id) => apiFetch(`/schedules/${id}`, { method: "DELETE" });
const paySchedule = (scheduleId, data) => apiFetch(`/schedules/${scheduleId}/payments`, {
  method: "POST",
  body: JSON.stringify({ amount: String(data.amount), payment_date: data.payment_date })
});
const $$splitErrorComponentImporter$1 = () => import("./agendamentos-BrTv9vw1.mjs");
const $$splitComponentImporter$1 = () => import("./agendamentos-BykI7Y6p.mjs");
const Route$1 = createFileRoute("/agendamentos")({
  head: () => ({
    meta: [{
      title: "Agendamentos — VPB"
    }]
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(schedulesQueryOptions),
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent")
});
const toNumber = (v) => {
  if (v === null || v === void 0 || v === "") return 0;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
};
const formatBRL = (v) => toNumber(v).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const STATUS_LABELS = {
  pago: "Pago",
  pendente: "Pendente",
  vencido: "Vencido",
  cancelado: "Cancelado",
  completed: "Concluído",
  pending: "Pendente",
  overdue: "Vencido",
  paid: "Pago"
};
function formatStatus(status) {
  if (!status) return "";
  const key = String(status).toLowerCase();
  if (STATUS_LABELS[key]) return STATUS_LABELS[key];
  return key.charAt(0).toUpperCase() + key.slice(1);
}
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
function StatusBadge({ status }) {
  const key = String(status ?? "").toLowerCase();
  let className = "";
  if (key === "pendente" || key === "pending") {
    className = "border-yellow-500/40 bg-yellow-500/20 text-yellow-300";
  } else if (key === "pago" || key === "paid" || key === "completed") {
    className = "border-green-500/40 bg-green-500/20 text-green-300";
  } else if (key === "vencido" || key === "overdue") {
    className = "border-red-500/40 bg-red-500/20 text-red-300";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className, children: formatStatus(status) });
}
function TypeBadge({ type }) {
  const isIncome = String(type ?? "").toLowerCase() === "receita";
  const className = isIncome ? "border-transparent bg-green-600 text-white" : "border-transparent bg-red-600 text-white";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className, children: isIncome ? "Receita" : "Despesa" });
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Popover = Root2;
const PopoverTrigger = Trigger;
const PopoverContent = reactExports.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = Content2.displayName;
const Dialog = Dialog$1;
const DialogTrigger = DialogTrigger$1;
const DialogPortal = DialogPortal$1;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogOverlay$1,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogOverlay$1.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent$1,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogClose, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogContent$1.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogTitle$1,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogTitle$1.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  DialogDescription$1,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogDescription$1.displayName;
const Command = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = _e.displayName;
const CommandInput = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    _e.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = _e.Input.displayName;
const CommandList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = _e.List.displayName;
const CommandEmpty = reactExports.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(_e.Empty, { ref, className: "py-6 text-center text-sm", ...props }));
CommandEmpty.displayName = _e.Empty.displayName;
const CommandGroup = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = _e.Group.displayName;
const CommandSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = _e.Separator.displayName;
const CommandItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
CommandItem.displayName = _e.Item.displayName;
objectType({
  user_id: coerce.number().int().positive(),
  name: stringType().min(1, "Nome obrigatório"),
  description: stringType().optional().nullable(),
  is_default: booleanType().optional()
});
const categoriesQueryOptions = queryOptions({
  queryKey: ["categories"],
  queryFn: () => apiFetch("/categories")
});
const createCategory = (data) => apiFetch("/categories", {
  method: "POST",
  body: JSON.stringify(data)
});
const updateCategory = (id, data) => apiFetch(`/categories/${id}`, {
  method: "PATCH",
  body: JSON.stringify(data)
});
const deleteCategory = (id) => apiFetch(`/categories/${id}`, { method: "DELETE" });
function CategoryCombobox({
  categories,
  value,
  onChange,
  currentUserId,
  disabled
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const qc = useQueryClient();
  const selected = categories.find((c) => c.id === value);
  const term = search.trim();
  const exists = term && categories.some((c) => c.name.toLowerCase() === term.toLowerCase());
  const createM = useMutation({
    mutationFn: async (name) => {
      if (!currentUserId) throw new Error("Faça login para criar categoria");
      return createCategory({ user_id: currentUserId, name });
    },
    onSuccess: (cat) => {
      toast.success(`Categoria "${cat.name}" criada`);
      qc.invalidateQueries({ queryKey: ["categories"] });
      onChange(cat.id);
      setOpen(false);
      setSearch("");
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "button",
        variant: "outline",
        role: "combobox",
        "aria-expanded": open,
        disabled,
        className: "w-full justify-between font-normal",
        children: [
          selected ? selected.name : "Selecionar categoria...",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-[var(--radix-popover-trigger-width)] p-0", align: "start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Command, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandInput, { placeholder: "Buscar categoria...", value: search, onValueChange: setSearch }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, { children: term ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "w-full px-2 py-1.5 text-left text-sm hover:bg-accent rounded",
            disabled: createM.isPending || !currentUserId,
            onClick: () => createM.mutate(term),
            children: createM.isPending ? "Criando..." : `+ Criar "${term}"`
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block px-2 py-1.5 text-sm text-muted-foreground", children: "Nenhuma categoria encontrada." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandGroup, { children: [
          categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            CommandItem,
            {
              value: c.name,
              onSelect: () => {
                onChange(c.id);
                setOpen(false);
                setSearch("");
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: cn("mr-2 h-4 w-4", value === c.id ? "opacity-100" : "opacity-0") }),
                c.name
              ]
            },
            c.id
          )),
          term && !exists && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            CommandItem,
            {
              value: `__create_${term}`,
              onSelect: () => createM.mutate(term),
              disabled: createM.isPending || !currentUserId,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
                createM.isPending ? "Criando..." : `Criar "${term}"`
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
function accountLabel(a) {
  return `${a.bank} — ${a.branch}/${a.account_number}`;
}
const $$splitErrorComponentImporter = () => import("./index-CxQKPd_7.mjs");
const $$splitComponentImporter = () => import("./index-d0E6OnwD.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Dashboard — VPB"
    }]
  }),
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(accountsQueryOptions),
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
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
const TransacoesRoute = Route$a.update({
  id: "/transacoes",
  path: "/transacoes",
  getParentRoute: () => Route$b
});
const RecuperarSenhaRoute = Route$9.update({
  id: "/recuperar-senha",
  path: "/recuperar-senha",
  getParentRoute: () => Route$b
});
const PerfilRoute = Route$8.update({
  id: "/perfil",
  path: "/perfil",
  getParentRoute: () => Route$b
});
const LoginRoute = Route$7.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$b
});
const HistoricoRoute = Route$6.update({
  id: "/historico",
  path: "/historico",
  getParentRoute: () => Route$b
});
const ContatoRoute = Route$5.update({
  id: "/contato",
  path: "/contato",
  getParentRoute: () => Route$b
});
const ContasRoute = Route$4.update({
  id: "/contas",
  path: "/contas",
  getParentRoute: () => Route$b
});
const CategoriasRoute = Route$3.update({
  id: "/categorias",
  path: "/categorias",
  getParentRoute: () => Route$b
});
const CadastroRoute = Route$2.update({
  id: "/cadastro",
  path: "/cadastro",
  getParentRoute: () => Route$b
});
const AgendamentosRoute = Route$1.update({
  id: "/agendamentos",
  path: "/agendamentos",
  getParentRoute: () => Route$b
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const rootRouteChildren = {
  IndexRoute,
  AgendamentosRoute,
  CadastroRoute,
  CategoriasRoute,
  ContasRoute,
  ContatoRoute,
  HistoricoRoute,
  LoginRoute,
  PerfilRoute,
  RecuperarSenhaRoute,
  TransacoesRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  createCategory as A,
  Button as B,
  CategoryCombobox as C,
  Dialog as D,
  updateCategory as E,
  Field as F,
  deleteCategory as G,
  userSchema as H,
  createUser as I,
  schedulesQueryOptions as J,
  scheduleSchema as K,
  createSchedule as L,
  deleteSchedule as M,
  paySchedule as N,
  updateSchedule as O,
  cn as P,
  buttonVariants as Q,
  accountDashboardQueryOptions as R,
  StatusBadge as S,
  TypeBadge as T,
  router as U,
  accountsQueryOptions as a,
  transactionSchema as b,
  categoriesQueryOptions as c,
  createTransaction as d,
  deleteTransaction as e,
  DialogTrigger as f,
  getSession as g,
  DialogContent as h,
  DialogHeader as i,
  DialogTitle as j,
  Badge as k,
  accountLabel as l,
  formatBRL as m,
  apiFetch as n,
  updatePassword as o,
  deleteUser as p,
  clearSession as q,
  loginSchema as r,
  login as s,
  transactionsQueryOptions as t,
  updateTransaction as u,
  saveSession as v,
  TransactionRow as w,
  accountSchema as x,
  createAccount as y,
  deleteAccount as z
};
