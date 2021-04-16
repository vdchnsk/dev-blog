import "../styles/globals.scss"
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./redux/rootReducer";
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

export default function MyApp({ Component, pageProps }) {

  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

