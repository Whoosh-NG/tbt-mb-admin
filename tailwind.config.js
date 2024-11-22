/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        pryColor: "#4c6538",
        secColor: "#ffcc29",
        white: "#fff",
        black: "#292312",
        dark: "#323232",
        Orange: "#FA8232",
        Grey1: "#525252",
        Greyish: { default: "#F2F4F5", 100: "#EEEEEE" },
        Grey2: "#565c69",
        Grey3: "#F9F9FA",
        Grey4: "#F3F4F8",
        Grey5: "#bcbcbd",
        Grey6: "#7e8494",
        Grey7: "#CCCFD6",
        Line: "#e5e7ef",
        rated: "#be9122",
        positive: "#17813C",
        negative: "#ff3b2d",
        receiver: "#eeeff2",
        sender: "#3b70fb",
        purple: "#7959F5",
      },
      boxShadow: {
        "3xl": "0px 12px 16px 0px #3A433D0F",
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
