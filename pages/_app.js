import { useEffect } from 'react'
import {  useSelector } from "react-redux"
import { useAuth } from "../pages/hooks/auth.hook"
import { wrapper } from "./redux";
import cookie from "js-cookie"
import "../styles/globals.scss"
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />;



const  MyApp = ({ Component, pageProps }) => {
  const globalState = useSelector(state => state)
  let userData = cookie.get('UserData')

  userData ? userData = JSON.parse(cookie.get('UserData')) : userData == null 

  if(userData){
    globalState.auth.userId = userData.userId
    globalState.auth.nickname = userData.nickname
    globalState.auth.userRole = userData.usersRole  
    globalState.auth.isAuthenticated = true
  }


  return (
    <Component {...pageProps} />
  )
}

export default wrapper.withRedux(MyApp);

