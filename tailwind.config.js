module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#021029",
          800: "#05223a",
          700: "#0b3b5a"
        },
        gold: {
          50: "#fffaf3",
          DEFAULT: "#c79b2b",
          dark: "#a67c1a"
        },
        accent: "#c79b2b"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};
