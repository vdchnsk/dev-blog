import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { MainLayout } from "../../../components/MainLayout";
import styles from '../../../styles/auth.module.scss'
import Link from "next/link"
import { MuiThemeProvider } from '@material-ui/core/styles';
import {theme} from '../../../styles/material_ui_presets/blackColorPreset'
import { useState } from "react";
import { useAuth } from "../../hooks/auth.hook";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useHttp } from "../../hooks/useHttp";
import { showAlert } from "../../redux/actions/alertActions";
import { Notification } from "../../../components/Notification";

export default function LogInPage () {
    const [nickanmeOrLogin , setNickanmeOrLogin] = useState("")
    const [password , setPassword] = useState("")
    const {loading, request} = useHttp()
    const {login}  = useAuth()
    const dispatch = useDispatch()
    const router = useRouter()

    async function loginSubmit(){
        
        const dataFromInputs = JSON.stringify({ nickanmeOrLogin, password })

        try {
            const responce = await request("../../api/auth/login", "POST", dataFromInputs)
            login(responce.nickname, responce.userId, responce.role)
            router.push("/")
            dispatch(showAlert(""))//очищаем состояние alert в redux
        } catch(e) {
            dispatch(showAlert(e.message))
        }
    }

    return(
        <MainLayout title={"Log in"}>
                <Notification/>
                <div className={styles.wrapper}>
                    <div className={styles.wrapper__window}>
                        <div className={styles.window__content}>
                            <h1 className={styles.window__content__heading}>Authorization</h1>
                            <div className={styles.window__content__inuts}>
                                <TextField onChange={(e) => setNickanmeOrLogin(e.target.value)} value={nickanmeOrLogin} name="email_or_login" className={styles.textInput} color={"secondary"} id="standard-password-input" label="Email or login" type="text" />
                                <TextField onChange={(e) => setPassword(e.target.value)} value={password} name="password" className={styles.textInput} color={"secondary"} id="standard-password-input" label="Password" type="password" />
                            </div>
                            <div className={styles.window__content__buttons}>
                                <Button disabled={loading} onClick={loginSubmit} variant="contained" size="medium" className={styles.formButton} >Log in</Button>
                            </div>
                            <div className={styles.window__content__registrationRef}>
                                <span >You have got no account? Then <Link href="/auth/client/RegPage"> register! </Link> </span>
                            </div>
                        </div>
                    </div>
                </div>
        </MainLayout>
    )
}