/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				bounce: "bounce 1s ease-in-out 1.5",
			},
		},
	},
	daisyui: {
		themes: [
			"retro",
			"night",
			"emerald",
			"cupcake",
			"synthwave",
			"cyberpunk",
			"coffee",
			"dracula",
			"forest",
			"dark",
			"aqua",
		],
	},
	plugins: [require("daisyui")],
};
