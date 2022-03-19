import Link from 'next/link'
import { Fragment } from 'react'
import { MainLayout } from '../components/MainLayout'
import ErrorStyles from '../../styles/error.module.scss'

export default function ErrorPage() {
    return (
        <MainLayout title={'404'}>
            {/* <h1 className={ErrorStyles.errorTitle}>Error 404</h1>
            <h2 className={ErrorStyles.errorTextSecondary}>Plaese, <Link href={"/"}>go back</Link> to safety</h2> */}
            <div className={ErrorStyles.Error_wrapper}>
                <div className={ErrorStyles.Error_wrapper__window}>
                    <div
                        style={{ color: 'black', fontSize: '2.0rem', marginBottom: '30px' }}
                        className="Error-window__header"
                    >
                        <span>Ooops...Page not found 😐</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className={ErrorStyles.Error_text}></div>
                    </div>
                    <div className="Error-window__footer">
                        <h2 className={ErrorStyles.errorTextSecondary}>
                            <Link href={'/'}>Plaese, go back to safety</Link>
                        </h2>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
