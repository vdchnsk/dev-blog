import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useRouter } from 'next/router'
import { providers, getSession, useSession } from 'next-auth/client'

import generator from 'generate-password'

import Button from '@material-ui/core/Button'

import { showAlert } from '../../../redux/actions/alertActions'

import { MainLayout } from '@components/MainLayout'
import { Notification } from '@components/Notification'

import { useHttp } from '../../../hooks/useHttp'
import { useAuth } from '../../../hooks/auth.hook'

import styles from '@styles/social/social_callback.module.scss'
import { API } from '../../../../constants/API'

export default function SocCallback({ session, generated_password }) {
    const userData = session.user
    const router = useRouter()
    const { inProcess, request } = useHttp()
    const { login } = useAuth()
    const dispatch = useDispatch()
    const [userPassword, setUserPassword] = useState(session.user.password)

    useEffect(async () => {
        try {
            let data = JSON.stringify({
                nickanmeOrLogin: session.user.email,
                password: generated_password,
                captchaToken: 'noNeed',
            })
            const authWay = await request(`${API.baseUri}auth/check_user_existence`, 'POST', data)
            setUserPassword(authWay.password)
            data = JSON.stringify({
                nickanmeOrLogin: authWay.nickanmeOrLogin,
                password: authWay.password,
                captchaToken: 'noNeed',
            })

            if (authWay.message === 'registration') {
                data = JSON.stringify({
                    nickname: session.user.name.trim(),
                    email: session.user.email,
                    password: generated_password,
                    password_repeat: generated_password,
                })
                const responce = await request(`${API.baseUri}auth/registration`, 'POST', data)
                login(responce.nickname, responce.userId, responce.role)
                dispatch(showAlert('', 'warning'))
                return
            }

            const responce = await request(`${API.baseUri}auth/login`, 'POST', data)
            login(responce.nickname, responce.userId, responce.role)
            dispatch(showAlert('', 'warning'))
        } catch (e) {
            console.log(e)
            dispatch(showAlert(e.message, 'warning'))
        }
    }, [])

    return (
        <MainLayout title={'Log in'}>
            <Notification />
            <div
                style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                className="wrapper"
            >
                <div
                    style={{
                        backgroundColor: '#F5F5F5',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        padding: '2%',
                        borderRadius: '15px',
                    }}
                    className="callback_window"
                >
                    <div style={{ display: 'flex', flexDirection: 'column' }} className="callback_window__header">
                        <h2>Congratulations! 🎉</h2>
                        <span className={styles.profile_info__item}>
                            You've signed in as <strong>{userData.name}</strong>
                        </span>
                        <img
                            style={{ borderRadius: '50%', maxWidth: '100px', margin: 'auto' }}
                            src={`${userData.image}`}
                        />
                    </div>
                    <div className="callback_window__body">
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                            className="callback_window__body_profileInfo"
                        >
                            <span className={styles.profile_info__item}>
                                Your email: <strong>{userData.email}</strong>
                            </span>
                            <span className={styles.profile_info__item}>
                                Your password:{' '}
                                <strong>
                                    {userPassword === undefined ? (
                                        <span style={{ opacity: '40%' }}>loading...</span>
                                    ) : (
                                        userPassword
                                    )}
                                </strong>
                            </span>
                            <span className={styles.profile_info__item}>
                                You're able to change everything in your profile settings page
                            </span>
                        </div>
                    </div>
                    <div className="callback_window__footer">
                        <Button
                            disabled={inProcess}
                            onClick={() => {
                                router.push('/')
                            }}
                            variant="contained"
                            size="medium"
                            style={{ color: 'white', background: 'black', margin: '10px' }}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

SocCallback.getInitialProps = async (context) => {
    const { req, res } = context
    const session = await getSession({ req })
    const generated_password = generator.generate({ length: 12, numbers: true })
    //проверка на то, естьб ли юзер в бд
    //в завтстмлсти от результата, отпрпавляьб пост на рег или логин
    //useAuth на фронте

    return {
        session: session,
        generated_password: generated_password,
    }
}
