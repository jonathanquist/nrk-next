import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        a5xl: [
          '2.625rem',
          {
            lineHeight: '2rem',
          },
        ],
      },
      colors: {
        primary: {
          100: 'rgb(244 242 243 / <alpha-value>)',
          300: 'rgb(235 228 216 / <alpha-value>)',
          500: 'rgb(195 188 155 / <alpha-value>)',
          900: 'rgb(58 33 17 / <alpha-value>)',
        },
        accent: {
          500: 'rgb(204 68 75 / <alpha-value>)',
        },
        schedule: {
          tavling: 'rgb(100 143 255 / <alpha-value>)',
          event: 'rgb(78 58 167 / <alpha-value>)',
          lektion: 'rgb(195 38 220 / <alpha-value>)',
          clinic: 'rgb(254 97 0 / <alpha-value>)',
          annat: 'rgb(253 193 60 / <alpha-value>)',
        },
      },
      boxShadow: {
        card: '0px 30px 80px rgba(0, 0, 0, 0.1)',
      },
      screens: {
        '3xl': '2200px',
        'h-sm': { raw: '(max-height: 520px)' },
        'max-lg': { raw: '(max-width: 1024px)' },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 1s ease-in-out',
      },
    },
    fontFamily: {
      sans: ['"Bricolage Grotesque"', 'sans-serif'],
      fira: ['"Fira Sans"', 'sans-serif'],
      cambria: ['Cambria', 'serif'],
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
