import { useState } from 'react'
import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { MainLayout } from '../../../components/MainLayout'
import Link from 'next/link'
import { useHttp } from '../../hooks/useHttp'
import styles from '../../../../styles/auth.module.scss'
import { Notification } from '../../../components/Notification'
import { showAlert } from '../../redux/actions/alertActions'
import { useDispatch } from 'react-redux'
import { useAuth } from '../../hooks/auth.hook'
import { useRouter } from 'next/router'

export default function RegPage() {
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_repeat, setPassword_repeat] = useState('')
    const { inProcess, request } = useHttp()
    const { login } = useAuth()
    const dispatch = useDispatch()
    const router = useRouter()

    async function regSubmit() {
        const dataFromInputs = JSON.stringify({ nickname, email, password, password_repeat })

        try {
            const responce = await request('../../api/auth/registration', 'POST', dataFromInputs)
            login(responce.nickname, responce.userId)
            router.push('/')
            dispatch(showAlert('', 'warning')) // очищаем состояние alert в redux
        } catch (e) {
            dispatch(showAlert(e.message, 'warning'))
        }
    }

    return (
        <MainLayout title={'Registration'}>
            <Notification />
            <div className={styles.wrapper}>
                <div className={styles.wrapper__window}>
                    <div className={styles.RegWindow__content}>
                        <h1 className={styles.window__content__heading}>Registration</h1>
                        <div className={styles.window__content__inuts}>
                            <TextField
                                onChange={(e) => setNickname(e.target.value)}
                                value={nickname}
                                name="nickname"
                                className={styles.textInput}
                                color={'secondary'}
                                id="standard-password-input"
                                label="Nickname"
                                type="text"
                                autoComplete="Off"
                            />
                            <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                name="email"
                                className={styles.textInput}
                                color={'secondary'}
                                id="standard-password-input"
                                label="Email"
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
                            <TextField
                                onChange={(e) => setPassword_repeat(e.target.value)}
                                value={password_repeat}
                                name="password_repeat"
                                className={styles.textInput}
                                color={'secondary'}
                                id="standard-password-input"
                                label="Repeat password"
                                type="password"
                                autoComplete="Off"
                            />
                        </div>
                        <div className={styles.window__content__buttons}>
                            <Button
                                onClick={regSubmit}
                                variant="contained"
                                size="medium"
                                className={styles.formButton}
                                disabled={inProcess}
                            >
                                Register
                            </Button>
                        </div>
                        <div className={styles.window__content__registrationRef}>
                            <span>
                                Already have got an account? <Link href="/auth/client/LogInPage"> login!</Link>{' '}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
