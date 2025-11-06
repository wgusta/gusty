/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-pink': '#D9366B',
        'teal': '#2A7C82',
        'sun-red': '#E62F2D',
        'brand-black': '#1A1A1A',
        'brand-white': '#FFFFFF',
        'off-white': '#F5F3E8',
      },
      fontFamily: {
        'stylish': ['Playfair Display', 'serif'],
        'terminal': ['IBM Plex Mono', 'monospace'],
        'erratic': ['Permanent Marker', 'cursive'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

