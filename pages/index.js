import Link from 'next/link'
import Head from 'next/head'
import { MainLayout } from "../components/MainLayout";

export default function Home() {
  return (
    <MainLayout title={'Home'}>
      <Head>
        <meta name="keywords" content="next js react node"/>
        <meta name="description" content="NextJS app"/>
        <meta charSet="utf-8"/>
      </Head>

      <h1>Home</h1>
      <p> <Link href="/about"> About</Link> </p>
    </MainLayout>
  )
}
