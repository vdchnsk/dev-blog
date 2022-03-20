import { TextField } from '@material-ui/core'
import { MainLayout } from '../../../components/MainLayout'
import { useRef, useState } from 'react'
import { useAuth } from '../../hooks/auth.hook'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useHttp } from '../../hooks/useHttp'
import { showAlert } from '../../redux/actions/alertActions'
import { Notification } from '../../../components/Notification'
import { providers, getSession, signIn, useSession } from 'next-auth/client'
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import ReCAPTCHA from 'react-google-recaptcha'
import styles from '../../../../styles/auth.module.scss'
import { API } from '../../../../constants/API'

export default function LogInPage({ providers }) {
    const [nickanmeOrLogin, setNickanmeOrLogin] = useState('')
    const [password, setPassword] = useState('')
    const [session, loading] = useSession() // session.user
    const { inProcess, request } = useHttp()
    const { login } = useAuth()
    const dispatch = useDispatch()
    const router = useRouter()
    const reCaptchRef = useRef()

    async function loginSubmit() {
        const captchaToken = await reCaptchRef.current.getValue()

        const dataFromInputs = JSON.stringify({ nickanmeOrLogin, password, captchaToken })

        try {
            const responce = await request(`${API.baseUri}api/auth/login`, 'POST', dataFromInputs)
            login(responce.nickname, responce.userId, responce.role)
            router.push('/')
            dispatch(showAlert('', 'warning')) //очищаем состояние alert в redux
            await reCaptchRef.current.reset()
        } catch (e) {
            console.log(e)
            dispatch(showAlert(e.message, 'warning'))
            await reCaptchRef.current.reset()
        }
    }

    return (
        <MainLayout title={'Log in'}>
            <Notification />
            <div className={styles.wrapper}>
                <div className={styles.wrapper__window}>
                    <div className={styles.window__content}>
                        <h1 className={styles.window__content__heading}>Authorization</h1>
                        <div className={styles.window__content__inuts}>
                            <TextField
                                onChange={(e) => setNickanmeOrLogin(e.target.value)}
                                value={nickanmeOrLogin}
                                name="email_or_login"
                                className={styles.textInput}
                                color={'secondary'}
                                id="standard-password-input"
                                label="Email or login"
                                type="text"
                                autoComplete="Off"
                            />
                            <TextField
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                name="password"
                                className={styles.textInput}
                                color={'secondary'}
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="Off"
                            />
                        </div>
                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
                            theme="light"
                            ref={reCaptchRef}
                            size="normal"
                        />
                        <div className={styles.window__content__buttons}>
                            <Button
                                disabled={inProcess}
                                onClick={loginSubmit}
                                variant="contained"
                                size="medium"
                                className={styles.formButton}
                            >
                                Log in
                            </Button>
                            <div className={styles.formButton__socialMedia}>
                                {Object.values(providers).map((provider) => {
                                    return (
                                        <button
                                            key={`${provider.id}`}
                                            onClick={() => {
                                                signIn(provider.id, {
                                                    callbackUrl:
                                                        'http://localhost:3000/auth/callback/social_m/SocCallback',
                                                })
                                            }}
                                            className={styles.formButtonSocMed}
                                            style={{
                                                backgroundImage:
                                                    'url(' +
                                                    '/static/socialMedia/' +
                                                    `${provider.id}` +
                                                    '_logo.png' +
                                                    ')',
                                            }}
                                        ></button>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={styles.window__content__registrationRef}>
                            <span>
                                You have got no account? Then <Link href="/auth/client/RegPage"> register! </Link>{' '}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

LogInPage.getInitialProps = async (context) => {
    return {
        session: undefined,
        providers: await providers(context),
    }
}
