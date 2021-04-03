import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { MainLayout } from "../../../components/MainLayout";
import styles from '../../../styles/auth.module.scss'
import Link from "next/link"
import { MuiThemeProvider } from '@material-ui/core/styles';
import {theme} from '../../../styles/material_ui_presets/blackColorPreset'

export default function LogInPage () {
    return(
        <MainLayout title={"Log in"}>
            <MuiThemeProvider theme={theme}> 
                <div className={styles.wrapper}>
                    <div className={styles.wrapper__window}>
                        <div className={styles.window__content}>
                            <h1 className={styles.window__content__heading}>Authorization</h1>
                            <div className={styles.window__content__inuts}>
                                <TextField name="email_or_login" className={styles.textInput} color={"secondary"} id="standard-password-input" label="Email or login" type="text" />
                                <TextField name="password" className={styles.textInput} color={"secondary"} id="standard-password-input" label="Password" type="password" />
                            </div>
                            <div className={styles.window__content__buttons}>
                                <Button variant="contained" size="medium" className={styles.formButton} >Log in</Button>
                            </div>
                            <div className={styles.window__content__registrationRef}>
                                <span >You have got no account? Then <Link href="/auth/client/RegPage"> register! </Link> </span>
                            </div>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        </MainLayout>
    )
}