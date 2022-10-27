import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
${reset}
* {
  box-sizing : border-box;
}

a {
  color:black
}

body{
  font-family: "Times New Roman", '나눔고딕', serif;
  background-color:#dfafaf;
}

`;

export default GlobalStyles;
