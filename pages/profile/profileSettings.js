import { useState } from 'react'
import { MainLayout } from '../../components/MainLayout'
import { Button, TextField } from '@material-ui/core'
import config from "config"
import jwt from 'jsonwebtoken'
import { useDispatch } from 'react-redux'
import { showAlert } from '../redux/actions/alertActions'
import { Notification } from '../../components/Notification'
import { useHttp } from '../hooks/useHttp'
import { useAuth } from '../hooks/auth.hook'
import { useRouter } from 'next/router'
import styles from '../../styles/profileSettings.module.scss'

export default function profileSettings ({...data}) {
    const userData = data.datatoken
    const userId = userData.id
    const [nickname, setNickname] = useState(userData.nickname)
    const [email, setEmail] = useState(userData.email)
    const [password, setPassword] = useState(userData.password)
    const dispatch = useDispatch()
    const {loading, request} = useHttp()
    const {login}  = useAuth()
    const router = useRouter()

    async function changeDataSubmit(){
        
        const dataFromInputs = JSON.stringify({ nickname, email, password, userId})
        if( nickname === userData.nickname &&
            email === userData.email &&
            password === userData.password
            ){
                dispatch(showAlert("Данные не были изменены!", "warning")) 
            }else{
                try {
                    const responce = await request("../../api/auth/changeData", "POST", dataFromInputs)
                    login(responce.nickname, responce.userId, responce.role)
                    router.push("/")
                    dispatch(showAlert("", "warning"))//очищаем состояние alert в redux
                } catch(e) {
                    dispatch(showAlert(e.message, "warning"))  
                }
            }
    }

    return (
        <>
        <MainLayout>
            <Notification/>
            <div className={styles.wrapper} >
                <div className={styles.profileSettings_img}></div>
                <div className={styles.profileSettings}>
                    <h1>Profile settings</h1>
                    <TextField onChange={(e) => setNickname(e.target.value)} className={styles.profileSettings__input} color={"secondary"} id="standard-required" label="nickname" defaultValue={userData.nickname} />
                    <TextField onChange={(e) => setEmail(e.target.value)} className={styles.profileSettings__input} color={"secondary"} id="standard-required" label="email" defaultValue={userData.email} />
                    <TextField onChange={(e) => setPassword(e.target.value)} className={styles.profileSettings__input} color={"secondary"} id="standard-required" label="password" defaultValue={userData.password} />
                    {/* <TextField color={"secondary"} id="standard-required" label="repeat password" defaultValue="" /> */}
                    <Button disabled={loading} onClick={changeDataSubmit} className={styles.profileSettings__button} color={"secondary"} variant="contained">Save</Button>
                </div>
            </div>
        </MainLayout>
        </>
    )
}
export async function getServerSideProps({req}) {
    if(req.cookies.token){
        const token = req.cookies.token
        const decodedJWT = jwt.verify(token, config.get("secretJWT"))
        return {
            props: {datatoken: decodedJWT || {}}
        }
    } else {
        return {
            props: {datatoken:{}}
        }
    }
}   