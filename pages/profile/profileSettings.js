import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainLayout } from '../../components/MainLayout'
import styles from '../../styles/profileSettings.module.scss'

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
                </div>
                
            </div>
        </MainLayout>
        </>
    )
}
