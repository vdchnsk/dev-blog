import router,{ useRouter } from 'next/router'
import { useEffect } from 'react'
import {  useSelector } from "react-redux"
import { useAuth } from "../pages/hooks/auth.hook"
import { wrapper } from "./redux";
import cookie from "js-cookie"
import "../styles/globals.scss"
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />;


export function Redirect({to}){
  
  const router = useRouter()
  useEffect(()=>{
      router.push(to)
  },[to]) 
  return nulls
}

const  MyApp = ({ Component, pageProps }) => {
  const userData = cookie.get('UserData')
  const globalState = useSelector(state => state)
  const { logout }  = useAuth()
  const query = router


  if(userData && globalState.auth.token === null){
    globalState.auth.isAuthenticated = true
  } 

  // if(!globalState.token){
  //   if(query.route == "/"){
  //     Router.push("/about")
  //   }
  // }

  return (
    <Component {...pageProps} />
  )
}

export default wrapper.withRedux(MyApp);

