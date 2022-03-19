import { useState } from 'react'
import { useSelector } from 'react-redux'

import { useRouter } from 'next/router'
import { signOut } from 'next-auth/client'

import SettingsIcon from '@material-ui/icons/Settings'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'

import { useAuth } from '../pages/hooks/auth.hook'

import styles from '../../styles/mainLayout/profileSettings.module.scss'

export const ProfileSettings = ({ socSession }) => {
    const globalState = useSelector((state) => state)

    const [anchorEl, setAnchorEl] = useState(null)

    const { logout } = useAuth()
    const router = useRouter()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleSettings = () => {
        setAnchorEl(null)
        router.push('/profile/profileSettings')
    }
    const handleLogout = async () => {
        if (!socSession) {
            try {
                logout()
                fetch('../../api/auth/logout', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: '',
                })
                setAnchorEl(null)
                router.push('/')
            } catch (e) {
                console.log(e)
            }
        } else {
            const signOutData = await signOut({ redirect: false, callbackUrl: 'http://localhost:3000/' })
            try {
                logout()
                fetch('../../api/auth/logout', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: '',
                })
                setAnchorEl(null)
                router.push('/')
            } catch (e) {
                console.log(e)
            }
            router.push(signOutData.url)
        }
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <Button aria-controls="simple-menu" color={'primary'} aria-haspopup="true" onClick={handleClick}>
                {globalState.auth.nickname}
            </Button>

            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <span className={styles.pupup__heading}>
                    <PermIdentityIcon color={'secondary'} /> {globalState.auth.nickname}
                </span>
                <MenuItem onClick={handleSettings}>
                    <SettingsIcon color={'secondary'} /> Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ExitToAppIcon color={'secondary'} /> Logout
                </MenuItem>
            </Menu>
        </>
    )
}
