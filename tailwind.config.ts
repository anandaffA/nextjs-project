import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        mist: 'var(--color-mist)',
        moss: 'var(--color-moss)',
        bark: 'var(--color-bark)',
        fog: 'var(--color-fog)',
        highlight: 'var(--color-highlight)',
        tint: 'var(--color-tint)',
      },
    },
  },
  plugins: [],
}
export default config
