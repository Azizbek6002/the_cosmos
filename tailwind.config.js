/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030303',
          900: '#070707',
          800: '#0d0d0d',
          700: '#151515',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
        display: ['Michroma', 'Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
