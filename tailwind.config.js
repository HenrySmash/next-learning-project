const defaultTheme = require('tailwindcss/defaultTheme');
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      ...defaultTheme.screens,
    },
    colors: {
      white: "#ffffff",
      background_primary: "#f2f2f7",
      text_secondary: "#3a3a3a",
      ...defaultTheme.colors
    },
    extend: {},
  },
  darkMode: "dark",
  plugins: [nextui({
    themes: {
      light: { colors: { 'background_custom': '#f2f2f2'}},
      dark: { colors: { 'background_custom': '#000000' } }, 
    },
  })],
}
