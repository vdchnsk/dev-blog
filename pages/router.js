import Link from "next/link"
import router from 'next/router'
import { useEffect, useState } from 'react'
import {  useSelector } from "react-redux"


export const useRoutes_custom = isAuthenticated =>{ //получаем информациб о том,авторизован ли юзер,перенаправляем его соответсвенно
    const query = router.router.pathname
    if ( !isAuthenticated ){
        if(query == "/profile/profileSettings"){
            return router.push("/auth/client/LogInPage")
        }
    } else {
        if(query == "/auth/client/LogInPage"){
            return router.push("/")
        }
    }
    return
}