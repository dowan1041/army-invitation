import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        invitation: {
          yellow: "#F5C518",
          dark: "#1a1a1a",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        script: ["Brush Script MT", "Segoe Script", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
