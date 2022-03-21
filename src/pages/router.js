import router from 'next/router'

export const useRoutes_custom = (isAuthenticated) => {
    const query = router.router.pathname
    if (isAuthenticated == false) {
        if (query == '/profile/profileSettings') {
            router.push('/')
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }
    } else {
        if (query == '/auth/client/LogInPage') {
            router.push('/')
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }
    }
}
