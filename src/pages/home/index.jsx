import Head from 'next/head'
import { MainLayout } from '../../components/MainLayout'
import { MainFeed } from './feeds/MainFeed'
import { SecondaryFeed } from './feeds/SecondaryFeed/index'

import styles from '../../../styles/home_page/home_page.module.scss'

export const HomePage = () => {
    return (
        <MainLayout title={'Home 👩‍💻👨‍💻'}>
            <Head>
                <meta name="keywords" content="next js react node" />
                <meta name="description" content="NextJS app" />
                <meta charSet="utf-8" />
            </Head>

            <div className={styles.wrapper}>
                <div className={styles.home}>
                    <MainFeed />
                    <SecondaryFeed />
                </div>
            </div>
        </MainLayout>
    )
}
