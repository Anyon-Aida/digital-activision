/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-kapcsolat': 'linear-gradient(90deg, #6E46E5 0%, #4666E5 50%, #04E4FF 100%)',
      },
    },
  },
  plugins: [],
}
