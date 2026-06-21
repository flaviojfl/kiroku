/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        washi: {
          DEFAULT: "#FBECD5",
          50: "#FEFAF2",
          100: "#FDF4E6",
          200: "#FBECD5",
          300: "#F4DCB8",
          400: "#E9C994",
        },
        sumi: {
          DEFAULT: "#25201D",
          soft: "#4A423D",
          muted: "#7A716A",
        },
        sakura: {
          DEFAULT: "#EC6F9E",
          soft: "#FBB9C7",
          deep: "#D14E81",
          50: "#FDEFF4",
        },
        nuvem: "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(37,32,29,0.04), 0 10px 30px -12px rgba(37,32,29,0.18)",
        "card-hover":
          "0 8px 20px -6px rgba(209,78,129,0.25), 0 24px 50px -20px rgba(37,32,29,0.30)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
