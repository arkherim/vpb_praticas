import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
objectType({
  name: stringType().min(1, "Nome obrigatório"),
  description: stringType().optional()
});
const SplitErrorComponent = ({
  error
}) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive", children: error.message });
export {
  SplitErrorComponent as errorComponent
};
