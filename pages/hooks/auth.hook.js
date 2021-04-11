// import {useState, useCallback, useEffect} from 'react'
// import { useSelector } from 'react-redux'

// const StorageName = 'UserData'

// export const useAuth = () =>{
//     const globalState = useSelector(state => state)
    
//     const [token, setToken] = useState(null)
//     const [ready, setReady] = useState(false)
//     const [userId, setUserId] = useState(null)

//     const login = useCallback((JsonWebToken, id)=>{
//         setToken(JsonWebToken)
//         setUserId(id)
//         localStorage.setItem(StorageName, JSON.stringify({userId:id, token:JsonWebToken}))
//     },[])

//     const logout = useCallback(()=>{
//         //очищаем логальный state 
//         setToken(null)
//         setUserId(null)
//         //очищаем local storage
//         localStorage.removeItem(StorageName)
//         //очищаем глобальный стейт
//         globalState.auth.token = null
//         globalState.auth.userId = null
//         globalState.auth.isAuthenticated = false
//     },[])

//     useEffect(() => {
//         const data = JSON.parse(localStorage.getItem(StorageName)) // JSON.parse приводит строку к объекту
//         // console.log("data was requiered")
//         if(data && data.token){
//             login(data.token, data.userId)
//         }
//         setReady(true)
//     },[login])


//     // dispatch(changeAuthStatusLogout(token, userId , true))
//     // console.log(authState)
//     return {login, logout, token, userId , ready}
// }