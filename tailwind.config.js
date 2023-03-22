module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    './node_modules/tw-elements/dist/js/**/*.{html,js,jsx}',
  ],
  plugins: [
    require('tw-elements/dist/plugin'),
  ],
}
