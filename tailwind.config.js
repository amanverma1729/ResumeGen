/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'flowcv-bg': '#F1F0EA',
        'flowcv-text': '#110c24',
        'flowcv-input': '#EAE9E2',
        'flowcv-gray': '#F3F4F6'
      }
    },
  },
  plugins: [],
}
