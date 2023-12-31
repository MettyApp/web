import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-gray-100',
    'bg-chartWeight-100',
    'bg-chartRate-100',
    'bg-chartVolume-100',
    'bg-chartDebit-100'
  ],
  theme: {
    extend: {
      colors: {
        'chartWeight': { 100: '#8f5522' },
        'chartRate': { 100: '#ebde34' },
        'chartVolume': { 100: '#0047ab' },
        'chartDebit': { 100: '#0096c7' },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
