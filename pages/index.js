import Link from 'next/link'
import Head from 'next/head'
import { MainLayout } from '../components/MainLayout'
import { MainFeed } from './home/feeds/MainFeed'
import { SecondaryFeed } from './home/feeds/SecondaryFeed/index'

export default function Home() {
	return (
		<MainLayout title={'Home 👩‍💻👨‍💻'}>
			<Head>
				<meta name="keywords" content="next js react node" />
				<meta name="description" content="NextJS app" />
				<meta charSet="utf-8" />
			</Head>

			<div className="wrapper">
				<div className="home">
					<MainFeed />
					<SecondaryFeed />
				</div>
			</div>
			<style jsx>
				{`
					.wrapper {
						display: flex;
						width: 100%;
						min-height: 80vh;
						justify-content: center;
					}
					.home {
						width: 75%;
						display: flex;
						align-items: center;
						margin-top: 20px;
					}
					.home__content__main {
						width: 80%;
					}
					.home__content__secondary {
						width: 20%;
						height: 700px;
						display: flex;
						flex-direction: column;
					}
					.home__content__desk {
						padding: 13px;
						border-radius: 10px;
						height: 60%;
						background-color: #f7f7f7;
						margin-bottom: 10px;
					}
				`}
			</style>
		</MainLayout>
	)
}
