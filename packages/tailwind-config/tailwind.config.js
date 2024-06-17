const raw = require('./rawTheme.js');
module.exports = {
  content: [
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  // plugins: ["prettier-plugin-tailwindcss"],
  theme: {
    extend: {
      colors: raw.raw.colors,
    }
  }
}
