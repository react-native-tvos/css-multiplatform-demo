/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    'layouts/**/*.{js,jsx,ts,tsx}',
    '../../packages/babel-plugin-expo-rncss/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [],
  theme: {},
};
