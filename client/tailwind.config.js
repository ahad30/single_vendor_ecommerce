import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      Poppins : ["Poppins", "sans-serif"]
    },
    extend: {
     colors : {
      primary : "#24354C",
      secondary: "#092635"
     }

    },
  },
  plugins: [],
});