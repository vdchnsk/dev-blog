import { useRouter } from 'next/router'

export const useUserRoutes = isAuthenticated =>{ //получаем информациб о том,авторизован ли юзер,перенаправляем его соответсвенно
    if(!isAuthenticated){
        return(
            
    return ( //если юзер не авторизвован перенаправляем его на главную странцу
        <Switch>
            <Route path="/"exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}