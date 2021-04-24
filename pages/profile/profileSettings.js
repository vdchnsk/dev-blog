import { useState } from 'react'
import { MainLayout } from '../../components/MainLayout'
import { Button, TextField } from '@material-ui/core'
import config from "config"
import jwt from 'jsonwebtoken'
import styles from '../../styles/profileSettings.module.scss'
import { useDispatch } from 'react-redux'
import { showAlert } from '../redux/actions/alertActions'
import { Notification } from '../../components/Notification'

export default function profileSettings ({...data}) {
    const userData = data.datatoken
    const [nickname, setNickname] = useState(userData.nickname)
    const [email, setEmail] = useState(userData.email)
    const [password, setPassword] = useState(userData.password)
    const dispatch = useDispatch()

    async function changeDataSubmit(){
        
        const dataFromInputs = JSON.stringify({ nickname, email, password })
        if( nickname === userData.nickname &&
            email === userData.email &&
            password === userData.password
            ){
                dispatch(showAlert("Данные не были изменены!")) 
            }else{
                try {
                    const responce = await request("../../api/auth/login", "POST", dataFromInputs)
                    login(responce.token, responce.userId, responce.role)
                    router.push("/")
                    dispatch(showAlert(""))//очищаем состояние alert в redux
                } catch(e) {
                    dispatch(showAlert(e.message))  
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
                    <TextField className={styles.profileSettings__input} color={"secondary"} id="standard-required" label="nickname" defaultValue={userData.nickname} />
                    <TextField className={styles.profileSettings__input} color={"secondary"} id="standard-required" label="email" defaultValue={userData.email} />
                    <TextField className={styles.profileSettings__input} color={"secondary"} id="standard-required" label="password" defaultValue={userData.password} />
                    {/* <TextField color={"secondary"} id="standard-required" label="repeat password" defaultValue="" /> */}
                    <Button onClick={changeDataSubmit} className={styles.profileSettings__button} color={"secondary"} variant="contained">Save</Button>
                </div>
            </div>
        </MainLayout>
        </>
    )
}
export async function getServerSideProps({req}) {
    const token = req.cookies.token
    const decodedJWT = jwt.verify(token, config.get("secretJWT"))
    return {
        props: {datatoken: decodedJWT || {}}
    }
}   