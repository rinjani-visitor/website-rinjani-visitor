/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rinjaniVisitor: {
          "green": "#32823A"
        }
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
        }
      },
      backgroundImage: {
        "rinjani-visitor": "url(https://utfs.io/f/8f4dbd43-132d-4c48-a62b-a19c6753b92b-n09cpl.jpg)"
      },
    },
  },
  plugins: [],
}
