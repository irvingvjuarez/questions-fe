/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js, jsx, ts, tsx}"
  ],
  purge: [
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
			colors: {
				"white": "var(--white)",
				"black": "var(--black)",
				"background": "var(--background)",
				"background-dark": "var(--background-dark)",
				"logo": "var(--logo)",
				"logo-clear": "var(--logo-clear)",
				"option1": "var(--option1)",
				"option1-dark": "var(--option1-dark)",
				"option2": "var(--option2)",
				"option2-dark": "var(--option2-dark)",
				"option3": "var(--option3)",
				"option3-dark": "var(--option3-dark)",
				"option4": "var(--option4)",
				"option4-dark": "var(--option4-dark)"
			},
			width: {
				"input": "300px"
			}
		},
  },
  plugins: [],
}
