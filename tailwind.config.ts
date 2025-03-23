import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./component/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        funkyAppear: {
          "0%": {
            opacity: 0,
            transform: "scale(0.5) rotate(-180deg)",
          },
          "50%": {
            opacity: 0.5,
            transform: "scale(1.1) rotate(20deg)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1) rotate(0deg)",
          },
        },
      },
      animation: {
        funkyAppear: "funkyAppear 1s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
