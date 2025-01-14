/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        background:"#FFFFFF",
        black:"#000000",
        activeButtonBlue:"#3E8DD4CC",
        inactiveButtonGrey: "#6F767E",
        statusPassedButton:"#16C09861",
        statusFailedButton:"#FFC5C5",
        statusPassedButtonBoarder:"#008767",
        statusFailedButtonBoarder:"#DF0404",
        completedButtongGreen:"#2EBD59",
      }
    },
  },
  plugins: [],
}

