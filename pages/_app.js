import { useSelector } from 'react-redux'
import cookie from 'js-cookie'
import { Provider } from 'next-auth/client'
import '../styles/globals.scss'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'
import { wrapper } from './redux'

;<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

const progress = new ProgressBar({
	size: 3,
	color: '#b797ef',
	className: 'bar-of-progress',
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

const MyApp = ({ Component, pageProps }) => {
	const globalState = useSelector((state) => state)
	let userData = cookie.get('UserData')

	userData ? (userData = JSON.parse(cookie.get('UserData'))) : userData == null

	if (userData) {
		globalState.auth.userId = userData.userId
		globalState.auth.nickname = userData.nickname
		globalState.auth.userRole = userData.usersRole
		globalState.auth.isAuthenticated = true
	}

	return (
		<Provider session={pageProps.session}>
			<Component {...pageProps} />
		</Provider>
	)
}

export default wrapper.withRedux(MyApp)
