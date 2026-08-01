/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        netflix: '#e50914',
        background: '#141414',
        surface: '#181818',
        surface2: '#222',
        muted: '#8c8c8c'
      },
      boxShadow: {
        netflix: '0 20px 80px rgba(0,0,0,0.45)',
        hoverCard: '0 24px 32px rgba(0,0,0,0.4)'
      },
      backgroundImage: {
        'hero-fade': 'linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(20,20,20,0.8) 60%, rgba(20,20,20,1) 100%)',
        'hero-left': 'linear-gradient(90deg, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0) 45%)'
      }
    }
  },
  plugins: []
};
