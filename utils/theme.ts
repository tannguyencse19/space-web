// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
// Cac gia tri duoc pass vao: https://chakra-ui.com/docs/theming/theme
export const theme = extendTheme({
  colors: {
    custom: {
      1: "#0b0d17",
      2: "#d0d6f9",
      //   3: "#ffffff", = white
    },
  },
  fonts: {
    bellefair: "Bellefair, serif",
    barlow_condensed: "Barlow Condensed, sans-serif;",
    body: "Bellefair, serif", // default font
  },
});

// 3. Code suggestion
// https://github.com/chakra-ui/chakra-ui/discussions/3226
// https://chakra-ui.com/docs/theming/advanced#theme-typings

interface Heading {
  fontFamily: string;
  fontSize: string;
  textTransform: any;
  letterSpacing?: string;
  color?: any;
  return: () => object;
}
export const heading: Heading = {
  fontFamily: "bellefair",
  fontSize: "30px",
  textTransform: "uppercase",
  return() {
    return {
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      textTransform: this.textTransform,
    };
  },
};

export const h1 = Object.create(heading);
h1.fontSize = "150px";

export const h2: Heading = Object.create(heading);
h2.fontSize = "100px";

export const h3: Heading = Object.create(heading);
h3.fontSize = "56px";

export const h4: Heading = Object.create(heading);
h4.fontSize = "32px";

export const listSubH1: Heading = Object.create(heading);
listSubH1.fontSize = "28px";

//--------------------------------------------------//

const heading_2: Heading = {
  fontFamily: "barlow_condensed",
  fontSize: "20px",
  textTransform: "uppercase",
  return() {
    return {
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      textTransform: this.textTransform,
      letterSpacing: this.letterSpacing,
      color: this.color,
    };
  },
};
export const h5: Heading = Object.create(heading_2);
h5.fontSize = "28px";
h5.letterSpacing = "4.75px";

export const listSubH2: Heading = Object.create(heading_2);
listSubH2.fontSize = "14px";
listSubH2.letterSpacing = "2.35px";

export const nav: Heading = Object.create(heading_2);
nav.fontSize = "16px";
nav.letterSpacing = "2.7px";