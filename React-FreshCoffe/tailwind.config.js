/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",  //escanea cual archivo va a tener tailwind
    "./src/**/*.{js,jsx}" //busca todos los archivos dentro se src que tenga extenciones de js, jsx
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

