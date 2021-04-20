import "../styles/globals.scss"
import { wrapper } from "./redux";
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />;

const  MyApp = ({ Component, pageProps }) => {
  return (
    <Component {...pageProps} />
  )
}

export default wrapper.withRedux(MyApp);

