/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#552FFF",
        secondary: "#EFEFEF",
      },
      backgroundColor: {
        primary: "#552FFF",
        secondary: "#EFEFEF",
      },
      backgroundImage: {
        "header-bg-image":
          'url("https://images.unsplash.com/photo-1495837174058-628aafc7d610?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      },
    },
  },
  plugins: [],
};
