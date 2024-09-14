import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { 
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Roboto', 'sans-serif'],
        serif: ['Lora', 'Playfair Display', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
        code: ['Source Code Pro', 'monospace'],
      },
      colors : {
        primary: '#fafafa',
        secondary:'#3d2217',
        tertiary: '#ae794b'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
