import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  preset: "vercel",
  vercel: {
    functions: {
      runtime: "nodejs22.x",
    },
  },
  externals: {
    inline: [
      "tslib",
      "react-remove-scroll",
      "react-remove-scroll-bar",
      "react-style-singleton",
      "use-callback-ref",
    ],
  },
});