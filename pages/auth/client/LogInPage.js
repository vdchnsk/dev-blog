import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { MainLayout } from "../../../components/MainLayout";
import styles from '../../../styles/auth.module.scss'
import Link from "next/link"
import { useRef, useState } from "react";
import { useAuth } from "../../hooks/auth.hook";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useHttp } from "../../hooks/useHttp";
import { showAlert } from "../../redux/actions/alertActions";
import { Notification } from "../../../components/Notification";
import ReCAPTCHA from "react-google-recaptcha"

export default function LogInPage () {
    const [nickanmeOrLogin , setNickanmeOrLogin] = useState("")
    const [password , setPassword] = useState("")
    const {loading, request} = useHttp()
    const {login}  = useAuth()
    const dispatch = useDispatch()
    const router = useRouter()
    const reCaptchRef = useRef()

    async function loginSubmit(){
        
        const captchaToken = await reCaptchRef.current.getValue()
        
        const dataFromInputs = JSON.stringify({ nickanmeOrLogin, password, captchaToken })
        
        try {
            const responce = await request("../../api/auth/login", "POST", dataFromInputs)
            login(responce.nickname, responce.userId, responce.role, captchaToken)
            router.push("/")
            dispatch(showAlert("", "warning"))//очищаем состояние alert в redux
            await reCaptchRef.current.reset()
        } catch(e) {
            console.log(e)
            dispatch(showAlert(e.message, "warning"))
            await reCaptchRef.current.reset()
        }
    }

    // const responseGoogle = (res)  => {
    //     console.log(res)
    // }
    return(
        <MainLayout title={"Log in"}>
                <Notification/>
                <div className={styles.wrapper}>
                    <div className={styles.wrapper__window}>
                        <div className={styles.window__content}>
                            <h1 className={styles.window__content__heading}>Authorization</h1>
                            <div className={styles.window__content__inuts}>
                                <TextField onChange={(e) => setNickanmeOrLogin(e.target.value)} value={nickanmeOrLogin} name="email_or_login" className={styles.textInput} color={"secondary"} id="standard-password-input" label="Email or login" type="text" autoComplete="Off"/>
                                <TextField onChange={(e) => setPassword(e.target.value)} value={password} name="password" className={styles.textInput} color={"secondary"} id="standard-password-input" label="Password" type="password" autoComplete="Off"/>
                            </div>
                            <ReCAPTCHA 
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
                                theme="light"
                                ref={reCaptchRef}
                                size="normal"
                            />
                            <div className={styles.window__content__buttons}>
                                <Button disabled={loading} onClick={loginSubmit} variant="contained" size="medium" className={styles.formButton} >Log in</Button>
                            </div>
                            <div className={styles.window__content__registrationRef}>
                                <span >You have got no account? Then <Link href="/auth/client/RegPage"> register! </Link> </span>
                            </div>
                            {/* <GoogleLogin
                                clientId="139188701722-jm9e4ebmke8bealg2dsi7c5mp3l1e7d2.apps.googleusercontent.com"
                                buttonText="Sign in with Google"
                                onSucces={responseGoogle}
                                onFailure={responseGoogle}
                                isSignedIn={true}
                                cookiePolicy={'single_host_origin'}
                            /> */}
                        </div>
                    </div>
                </div>
        </MainLayout>
    )
}