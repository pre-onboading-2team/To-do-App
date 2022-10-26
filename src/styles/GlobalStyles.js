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
}

html, body, #root {
  width: 100%;
  height: 100%;
  background-color:#dfafaf;
  display: flex; 
  align-items: flex-start;
  justify-content:center;
}

`;

export default GlobalStyles;
