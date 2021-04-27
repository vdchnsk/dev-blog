import router,{ useRouter } from 'next/router'
import { useEffect } from 'react'
import {  useSelector } from "react-redux"
import { useAuth } from "../pages/hooks/auth.hook"
import { wrapper } from "./redux";
import { useRoutes_custom } from "./router"
import cookie from "js-cookie"
import "../styles/globals.scss"
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />;



const  MyApp = ({ Component, pageProps }) => {
  const userData = cookie.get('UserData')
  const globalState = useSelector(state => state)
  const { logout }  = useAuth()
  const query = router

  // useEffect(() => {
  //   useRoutes_custom(globalState.auth.isAuthenticated)
  //   console.log("1")
  // },[])
  if(userData && globalState.auth.token === null){
    globalState.auth.isAuthenticated = true
  } 

  return (
    <Component {...pageProps} />
  )
}

export default wrapper.withRedux(MyApp);

