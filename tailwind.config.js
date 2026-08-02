/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        netflix: '#e50914',
        'netflix-hover': '#f40612',
        background: '#141414',
        surface: '#181818',
        surface2: '#222',
        muted: '#8c8c8c'
      },
      boxShadow: {
        netflix: '0 20px 80px rgba(0,0,0,0.45)',
        hoverCard: '0 24px 32px rgba(0,0,0,0.4)',
        'glow-red': '0 0 24px rgba(229,9,20,0.55)',
        'glow-red-lg': '0 0 48px rgba(229,9,20,0.75)'
      },
      backgroundImage: {
        'hero-fade': 'linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(20,20,20,0.8) 60%, rgba(20,20,20,1) 100%)',
        'hero-left': 'linear-gradient(90deg, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0) 45%)',
        'card-fade': 'linear-gradient(180deg, rgba(20,20,20,0) 40%, rgba(20,20,20,0.92) 100%)',
        'glow-radial': 'radial-gradient(ellipse at center, rgba(229,9,20,0.16) 0%, rgba(20,20,20,0) 65%)'
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1) translateY(0)' },
          '100%': { transform: 'scale(1.12) translateY(-2%)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 12px rgba(229,9,20,0.45)' },
          '50%': { boxShadow: '0 0 36px rgba(229,9,20,0.85)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        }
      },
      animation: {
        kenburns: 'kenburns 22s ease-out forwards',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        shimmer: 'shimmer 2.2s linear infinite',
        float: 'float 7s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
