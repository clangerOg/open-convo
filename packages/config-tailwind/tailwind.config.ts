import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        lg: "1024px",
      },
    },
    extend: {
      colors: {
        foreground: colors.zinc[900],
        background: colors.white,
        border: colors.zinc[200],
        primary: colors.zinc,
        accent: colors.orange,
        "card-bg": colors.zinc[50],
        ring: colors.orange[500],
      },
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
    },
  },
  plugins: [],
};
export default config;
