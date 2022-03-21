import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core'
import { theme } from '../styles/material_ui_presets/blackColorPreset'
import { useRoutes_custom } from '../pages/router'
import { ProfileSettings } from './ProfileSettings'
import { useSession } from 'next-auth/client'

import styles from '../styles/mainLayout/mainlayout.module.scss'

export const MainLayout = ({ children, title = 'Next', data }) => {
    const globalState = useSelector((state) => state)
    const [session] = useSession()

    useEffect(() => {
        useRoutes_custom(globalState.auth.isAuthenticated)
    }, [])
    return (
        <Fragment>
            <MuiThemeProvider theme={theme}>
                <Head>
                    <title>Next | {title}</title>
                </Head>
                <nav className={styles.nav}>
                    <div className={styles.nav__navButton}>
                        <Link href={'/'}>
                            <a className={styles.nav__link}>Home</a>
                        </Link>
                        <Link href={'/about'}>
                            <a className={styles.nav__link}>About</a>
                        </Link>
                        <Link href={'/posts'}>
                            <a className={styles.nav__link}>Posts</a>
                        </Link>
                    </div>
                    <div className={styles.nav__secondaryButtons}>
                        {globalState.auth.isAuthenticated === false ? (
                            <Link style={{ cursor: 'pointer' }} href="/auth/client/LogInPage">
                                <a>Log in</a>
                            </Link>
                        ) : (
                            <ProfileSettings socSession={session} />
                        )}
                    </div>
                </nav>
                <main className={styles.content}>{children}</main>
            </MuiThemeProvider>
        </Fragment>
    )
}
