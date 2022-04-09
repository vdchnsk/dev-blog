import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Button, Checkbox, TextField } from '@material-ui/core'
import config from 'config'
import jwt from 'jsonwebtoken'

import { MainLayout } from '../../components/MainLayout'
import { Notification } from '../../components/Notification'

import { showAlert } from '../redux/actions/alertActions'

import { useHttp } from '../hooks/useHttp'
import { useAuth } from '../hooks/auth.hook'

import { API } from '../../constants/API'
import styles from 'styles/profile_settings_page/profileSettings.module.scss'

export async function getServerSideProps({ req }) {
    if (req.cookies.token) {
        const token = req.cookies.token
        const decodedJWT = jwt.verify(token, config.get('secretJWT'))
        return {
            props: { datatoken: decodedJWT || {} },
        }
    } else {
        return {
            props: { datatoken: {} },
        }
    }
}

export default function profileSettings({ ...data }) {
    const userData = data.datatoken
    const userId = userData.id
    const [nickname, setNickname] = useState(userData.nickname)
    const [email, setEmail] = useState(userData.email)
    const [password, setPassword] = useState(userData.password)
    const dispatch = useDispatch()
    const { inProcess, request } = useHttp()
    const { login } = useAuth()
    const router = useRouter()
    const [passwordVisible, setPasswordVisible] = useState('password')
    const userError = []
    async function changeDataSubmit() {
        const dataFromInputs = JSON.stringify({ nickname, email, password, userId })
        if (nickname === userData.nickname && email === userData.email && password === userData.password) {
            dispatch(showAlert('Данные не были изменены!', 'warning'))
        } else {
            try {
                const responce = await request(`${API.baseUri}}auth/changeData`, 'POST', dataFromInputs)
                console.log(responce)
                login(responce.newNickname, responce.userId, responce.role)
                router.push('/')
                dispatch(showAlert('', 'warning'))
            } catch (e) {
                dispatch(showAlert(e.message, 'warning'))
            }
        }
    }

    return (
        <>
            <MainLayout title={'Settings ⚙'}>
                <Notification />
                <div className={styles.wrapper}>
                    <div className={styles.profileSettings_img}></div>
                    <div className={styles.profileSettings}>
                        <h1>Profile settings</h1>
                        <TextField
                            error={userError.includes('nickname')}
                            onChange={(e) => setNickname(e.target.value)}
                            className={styles.profileSettings__input}
                            color={'secondary'}
                            id="standard-required"
                            label="nickname"
                            defaultValue={userData.nickname}
                        />
                        <TextField
                            error={userError.includes('email')}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.profileSettings__input}
                            color={'secondary'}
                            id="standard-required"
                            label="email"
                            defaultValue={userData.email}
                        />
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                            className={styles.profileSettings__input}
                        >
                            <TextField
                                error={userError.includes('password')}
                                onChange={(e) => setPassword(e.target.value)}
                                type={passwordVisible}
                                color={'secondary'}
                                id="standard-required"
                                label="password"
                                defaultValue={userData.password}
                            />
                            <strong style={{ textAlign: 'center', display: 'flex', marginTop: '20px' }}>
                                Show the password
                                <input
                                    onChange={() => {
                                        passwordVisible === 'password'
                                            ? setPasswordVisible('text')
                                            : setPasswordVisible('password')
                                    }}
                                    style={{ cursor: 'pointer', marginLeft: '5px', width: '17px', height: '17px' }}
                                    type="checkbox"
                                />
                            </strong>
                        </div>
                        <Button
                            disabled={inProcess}
                            onClick={changeDataSubmit}
                            className={styles.profileSettings__button}
                            color={'secondary'}
                            variant="contained"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}
