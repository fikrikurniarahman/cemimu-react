/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wheat: '#F7ECD1',
        wheatdark: '#EDE0BD',
        barn: '#B23A2E',
        barndark: '#8E2C22',
        grass: '#3E6B2F',
        grassdark: '#2C4E22',
        soil: '#8A5A2B',
        gold: '#F2A93B',
        ink: '#2D2A20',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 0 rgba(45,42,32,0.12)',
        pop: '0 6px 0 rgba(0,0,0,0.18)',
      },
    },
  },
  plugins: [],
}
