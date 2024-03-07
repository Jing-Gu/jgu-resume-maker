/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    fontFamily: {
      sans: ["Manrope", "sans-serif"]
    },
		colors: {
			"cream": "#FFF8E5",
			"charcoal": "#333333",
			"smoke": "#757575",
      "offwhite": "#fdfdfd",
			"white": "#fff"
		},
    extend: {},
  },
  plugins: [],
}

