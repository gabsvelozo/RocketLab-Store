/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Aileron', ...defaultTheme.fontFamily.sans],
        ivymode: ['IvyMode', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}
