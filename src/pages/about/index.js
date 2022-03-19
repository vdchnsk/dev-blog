import Router from 'next/router'
import { MainLayout } from '../../components/MainLayout'

export default function about({ heading }) {
    const clickHandler = () => {
        Router.push('/')
    }
    return (
        <MainLayout title={'About'}>
            <h1>About</h1>
            <h2>{heading}</h2>
            <button onClick={clickHandler}>Go back to home</button>
        </MainLayout>
    )
}
about.getInitialProps = async () => {
    const responce = await fetch('http://localhost:4200/about')
    const data = await responce.json()
    return { heading: data.title }
}
