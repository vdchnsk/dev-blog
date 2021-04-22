import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainLayout } from '../../components/MainLayout'
import styles from '../../styles/profileSettings.module.scss'
import { Button, TextField } from '@material-ui/core'

export default function profileSettings ({userId}) {
    const router = useRouter()

    // if(!post){
    //     return (
    //         <MainLayout>
    //             <Loader/>
    //         </MainLayout>
    //     )
    // }
    return (
        <>
        <MainLayout>
            <div className={styles.wrapper} >
                <div className={styles.profileSettings_img}></div>
                <div className={styles.profileSettings}>
                    <h1>Настройки профиля</h1>
                    <TextField className={styles.profileSettings__input} color={"secondary"} id="standard-required" label="nickname" defaultValue="" />
                    <TextField className={styles.profileSettings__input} color={"secondary"} id="standard-required" label="email" defaultValue="" />
                    <TextField className={styles.profileSettings__input} color={"secondary"} id="standard-required" label="password" defaultValue="" />
                    {/* <TextField color={"secondary"} id="standard-required" label="repeat password" defaultValue="" /> */}
                    <Button className={styles.profileSettings__button} color={"secondary"} variant="contained">Save</Button>
                </div>
                
                
            </div>
        </MainLayout>
        </>
    )
}
