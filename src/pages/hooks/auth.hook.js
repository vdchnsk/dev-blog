import {useState, useCallback, useEffect} from 'react'
import { useSelector } from 'react-redux'
import cookie from "js-cookie"

const cookieStorage = 'UserData'

export const useAuth = () =>{
    const globalState = useSelector(state => state)
    
    const [nickname, setNickname] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userRole, setUserRole] = useState(null)

    const login = useCallback((nickname, id, role)=>{
        setNickname(nickname)
        setUserId(id)
        setUserRole(role)
        globalState.auth.nickname = nickname
        globalState.auth.userId = id
        globalState.auth.userRole = role
        globalState.auth.isAuthenticated = true
        cookie.set(cookieStorage, JSON.stringify({nickname:nickname, userId:id, usersRole:role}) )
    },[])

    const logout = useCallback(()=>{
        //очищаем локальный state 
        setNickname(null)
        setUserId(null)
        setUserRole(null)

        //очищаем cookie storage
        cookie.remove(cookieStorage)

        //очищаем глобальный стейт
        globalState.auth.nickname = null
        globalState.auth.userId = null
        globalState.auth.userRole = null
        globalState.auth.isAuthenticated = false
    },[])
    useEffect(() => {
        if(cookie.get(cookieStorage)){
            const data = JSON.parse(cookie.get(cookieStorage)) // JSON.parse приводит строку к объекту
            if(data && data.token){
                login(data.token, data.userId)
            }
            setReady(true)
        }
    },[login])

    return {login, logout, nickname, userId ,userRole, ready}
}