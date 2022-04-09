import Router from 'next/router'
import { API } from '../../constants/API'
import { MainLayout } from '@components/MainLayout'

export async function getServerSideProps() {
    const responce = await fetch(`${API.mockUri}about`)
    const data = await responce.json()

    return { props: { heading: data.title } }
}

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
