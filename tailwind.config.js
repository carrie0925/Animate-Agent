export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(red|pink|indigo|gray)-[0-9]+/,
    },
    {
      pattern: /text-(white|gray|pink|black)-[0-9]+/,
    },
  ],
};
