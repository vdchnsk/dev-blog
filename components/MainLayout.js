import Head from "next/head"
import Link from "next/link"
import { useEffect, useMemo, useState } from 'react'
import { Fragment } from "react"
import {  useSelector } from "react-redux"
import { MuiThemeProvider } from "@material-ui/core"
import { theme } from "../styles/material_ui_presets/blackColorPreset"
import { useRoutes_custom } from "../pages/router"
import { ProfileSettings } from "./ProfileSettings"



export const MainLayout = ({children , title = "Next"}) => { 
    const globalState = useSelector(state => state)

    useEffect(() => {
        useRoutes_custom(globalState.auth.isAuthenticated)
    },[])
    return (
        <Fragment>
            <MuiThemeProvider theme={theme}> 
                <Head>
                    <title>Next | {title}</title>
                </Head>
                <nav>
                    <div className="nav__navButton">
                        <Link href={"/"}><a>Home</a></Link>
                        <Link href={"/about"}><a>About</a></Link>
                        <Link href={"/posts"}><a>Posts</a></Link>
                    </div>
                    <div className="nav__secondaryButtons">
                        { globalState.auth.isAuthenticated === false  ? <Link href={"/auth/client/LogInPage"}><a>Log in</a></Link> : <ProfileSettings />}
                    </div>
                </nav>
                <main>
                    {children}
                </main>
                {/* если добавить "global" в тэг "style", то стили станут глобальными */}
                <style jsx >{`
                    * {
                        padding:0;
                        margin:0;
                    }
                    nav{
                        position:fixed;
                        top:0;
                        height:60px;
                        left:0;
                        right:0;
                        width:100%;
                        background-color:black;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                    }
                    a{
                        color:white;
                        text-decoration:none;
                        padding:10px;
                    }
                    main{
                        margin-top:60px;
                    }
                    .nav__secondaryButtons{
                        position:absolute;
                        right:0;
                        margin-right:1%;
                        display:flex;

                    }
                    .logoutButton{
                        margin-right: 5px;
                        background:none;
                        color:white;
                        border:none;
                        font-size:.9rem;
                        cursor:pointer;
                        outline:none;
                    }
                    .settingsButton{
                        background:none;
                        border:none;
                        cursor:pointer;
                        outline:none;
                    }
                `}
                </style>
            </MuiThemeProvider>
        </Fragment>
    )
}