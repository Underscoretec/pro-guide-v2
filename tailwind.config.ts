import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#673AB7',
          d: '#4A148C',
          dd: '#38106E',
          bar: '#4A148C',
        },
        tint: '#F2ECFA',
        ink: '#1F2328',
        muted: '#5F6670',
        line: '#E3E5E9',
        card: '#F4F4F6',
        green: '#17A05E',
        orange: {
          DEFAULT: '#E67E22',
          d: '#D35400',
        },
        lav: {
          DEFAULT: '#9C82BE',
          l: '#D2C4E3',
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'system-ui', '-apple-system', 'Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
