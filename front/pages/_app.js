import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap');
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Roboto Slab', serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
      <>
        <GlobalStyles />
        <Component {...pageProps} />
      </>
  );
}
