import Link from 'next/link'
import Head from 'next/head'
import { MainLayout } from "../components/MainLayout";

export default function Home(props) {
  return (
    <MainLayout title={'Home'}>
      <Head>
        <meta name="keywords" content="next js react node"/>
        <meta name="description" content="NextJS app"/>
        <meta charSet="utf-8"/>
      </Head>

      <h1>Home</h1>
      <p> <Link href="/about"> About</Link> </p>
      <span>{props.numbers.theFirstOne}</span> <br/>
      <span>{props.numbers.theSecondOne}</span>
    </MainLayout>
  )
}

export function getServerSideProps(){
  return {
    props :{
      numbers:
        {
        theFirstOne:"from 'server' 1",
        theSecondOne:"from 'server' 2"
        },
    }
  }
}