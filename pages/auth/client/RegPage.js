import { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { MainLayout } from "../../../components/MainLayout";
import Link from "next/link"
import { MuiThemeProvider } from '@material-ui/core/styles';
import {theme} from '../../../styles/material_ui_presets/blackColorPreset'
import { useHttp } from "../../hooks/useHttp";
import styles from '../../../styles/auth.module.scss'
import { Notification } from "../../../components/Notification";
import { showAlert } from "../../redux/actions/alertActions";
import { useDispatch } from "react-redux";

export default function RegPage () {
    const [nickanme , setNickanme] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [password_repeat , setPassword_repeat] = useState("")
    const {loading, request} = useHttp()
    const dispatch = useDispatch()

    async function RegSubmit(){
        
        const dataFromInputs = JSON.stringify({nickanme, email , password ,password_repeat})

        try {
            const responce = await request("../../api/auth/registration", "POST", dataFromInputs)
        } catch(e) {
            dispatch(showAlert(e.message))
        }
    }

    return(
        <MainLayout title={"Registration"}>
            <MuiThemeProvider theme={theme}>
                <Notification/>
                <div className={styles.wrapper}>  
                    <div className={styles.wrapper__window}>
                        <div className={styles.RegWindow__content}>
                            <h1 className={styles.window__content__heading}>Registration</h1>
                            <div className={styles.window__content__inuts}>
                                <TextField onChange={(e) => setNickanme(e.target.value)} value={nickanme} name="nickanme" className={styles.textInput} color={"secondary"} id="standard-password-input" label="Nickname" type="text" />
                                <TextField onChange={(e) => setEmail(e.target.value)} value={email} name="email" className={styles.textInput} color={"secondary"} id="standard-password-input" label="Email or login" type="text" />
                                <TextField onChange={(e) => setPassword(e.target.value)} value={password} name="password" className={styles.textInput} color={"secondary"} id="standard-password-input" label="Password" type="password" />
                                <TextField onChange={(e) => setPassword_repeat(e.target.value)} value={password_repeat} name="password_repeat" className={styles.textInput} color={"secondary"} id="standard-password-input" label="Repeat password" type="password" />
                            </div>
                            <div className={styles.window__content__buttons}>
                                <Button onClick={RegSubmit} variant="contained" size="medium" className={styles.formButton} disabled ={loading}>Register</Button>
                            </div>
                            <div className={styles.window__content__registrationRef}>
                                <span >Already have got an account? <Link href="/auth/client/LogInPage"> login!</Link> </span>
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        </MainLayout>
    )
}