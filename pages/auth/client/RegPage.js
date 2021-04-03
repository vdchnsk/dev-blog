import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { MainLayout } from "../../../components/MainLayout";
import styles from '../../../styles/auth.module.scss'
import Link from "next/link"
import { MuiThemeProvider } from '@material-ui/core/styles';
import {theme} from '../../../styles/material_ui_presets/blackColorPreset'

export default function RegPage () {
    return(
        <MainLayout title={"Registration"}>
            <MuiThemeProvider theme={theme}>
                <div className={styles.wrapper}>
                    <div className={styles.wrapper__window}>
                        <div className={styles.RegWindow__content}>
                            <h1 className={styles.window__content__heading}>Registration</h1>
                            <div className={styles.window__content__inuts}>
                                <TextField name="email_or_login" className={styles.textInput} color={"secondary"} id="standard-password-input" label="Nickname" type="text" />
                                <TextField name="email_or_login" className={styles.textInput} color={"secondary"} id="standard-password-input" label="Email or login" type="text" />
                                <TextField name="password" className={styles.textInput} color={"secondary"} id="standard-password-input" label="Password" type="password" />
                                <TextField name="password_repeat" className={styles.textInput} color={"secondary"} id="standard-password-input" label="Repeat password" type="password" />
                            </div>
                            <div className={styles.window__content__buttons}>
                                <Button variant="contained" size="medium" className={styles.formButton} >Register</Button>
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