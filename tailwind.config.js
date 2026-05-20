import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};

export default config;