// import "../styles/globals.css";
import Layout from "../components/Layout";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
${reset}
*, *:before, *:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-family: "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "Hiragino Sans", "ヒラギノ角ゴシック", sans-serif;
}
html{
  font-size: 62.5%;
}
body{
  background-color: #000;
  color: #fff;
}
a{
  text-decoration: none;
  color: #fff;
}
`;

export default MyApp;
