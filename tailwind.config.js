module.exports = {
    content: ["./src/modules/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],
    theme: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      extend: {
        spacing: {
          "8xl": "96rem",
          "9xl": "128rem",
        },
        borderRadius: {
          "4xl": "2rem",
        },
        colors: {
          peach:{
            DEFAULT: "FFCFA3",
            "100": "FFF5E1",
            "200": "FFDEBE",
            "300": "FFCFA3",
            "400": "FFC08D",
            "500": "FFAC7F"
          },
          gray:{
            DEFAULT: "#707070",
            "100" : "#fafafa",
            "200" : "#f5f5f5",
            "300" : "#e0e0e0",
          }
        },
      },
    },
  };
  