import "../styles/globals.scss"
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./redux/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

export default function MyApp({ Component, pageProps }) {

  const store = createStore(rootReducer, composeWithDevTools());

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

