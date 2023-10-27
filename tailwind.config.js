const defaultTheme = require('tailwindcss/defaultTheme');
const { nextui } = require("@nextui-org/react");

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
      ...defaultTheme.colors
    },
    extend: {},
  },
  darkMode: "dark",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          background: {
            default: '#FAFAFA',
            navbar: '#EAEAEA',
            cursor: '#E0E0E0',
            divider: '#E0E0E0',
          },
          text: {
            primary: '#555',
            header: '#3D3D3D',
          },
        },
      },
      dark: {
        colors: {
          background: {
            default: '#313131',
            navbar: '#444',
            cursor: '#3D3D3D',
            divider: '#B0B0B0',
          },
          text: {
            primary: '#F0F0F0',
            header: '#EDEDED',
          },
        },
      },
    }
  }
  )],
}
