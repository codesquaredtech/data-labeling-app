/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx,tsx}'],
	daisyui: {
		themes: ['retro', 'night', 'emerald'],
	},
	plugins: [require('daisyui')],
};
