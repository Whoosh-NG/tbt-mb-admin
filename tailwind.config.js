/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        'whoosh-red': 'var(--pryColor)',
        white: '#fff',
        black: '#090909',
        grey1: '#9CA3AF',
        grey2: '#f9f9fa',
        grey3: '#b2b6bb',
        grey4: '#f4f5f8',
        grey5: '#e9ecee',
        grey6: '#7e8494',
        grey7: '#4f4f4f',
        line: '#e9ecee',
        rated: '#ffd700',
        positive: '#34db3a',
        negative: '#ff3b2d',
        warning: '#fb9536',
        pending: '#ffb800',
        receiver: '#eeeff2',
        sender: '#3b70fb',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
