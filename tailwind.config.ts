import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bgColor: '#18191a',
        boxColor: '#242526',
        btn: '#0866ff',
        bgLogin: '#f0f2f5',
        baseColor: '#d12026',
      },
    },
  },
  plugins: [],
};
export default config;
