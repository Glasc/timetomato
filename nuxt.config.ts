// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@pinia/nuxt",
    "nuxt-icon",
    "@nuxtjs/color-mode",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Lexend: "400..700",
        },
      },
    ],
  ],
  colorMode: {
    preference: "sunset", // default value of $colorMode.preference
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    storageKey: "nuxt-color-mode",
    dataValue: "theme",
  },
  components: {
    dirs: ["~/components/"],
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  routeRules: {
    // Homepage pre-rendered at build time
    "/": { ssr: true },
    // Product page generated on-demand, revalidates in background
    "/app": { ssr: true },
    "/signup": { prerender: true, ssr: true },
    "/login": { prerender: true, ssr: true },
  },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/tomaton.ico",
        },
      ],
      script: [
        {
          src: "script.js",
          type: "module",
          defer: true,
        },
      ],
    },
  },
})
