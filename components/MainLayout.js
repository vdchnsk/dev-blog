import Head from "next/head"
import Link from "next/link"
import { Fragment } from "react"
import { useSelector } from "react-redux"
import { useAuth } from "../pages/hooks/auth.hook"

export const MainLayout = ({children , title = "Next"}) => { 
    const globalState = useSelector(state => state)
    const { logout }  = useAuth()

    const logoutHandler = () => {
        logout()
    }
    return (
        <Fragment>
            <Head>
                <title>Next | {title}</title>
            </Head>
            <nav>
                <div className="nav__navButton">
                    <Link href={"/"}><a>Home</a></Link>
                    <Link href={"/about"}><a>About</a></Link>
                    <Link href={"/posts"}><a>Posts</a></Link>
                </div>
                <div className="nav__secondaryButtons">
                    { globalState.auth.token === null  ? <Link href={"/auth/client/LogInPage"}><a>Log in</a></Link> : <button onClick={logoutHandler} className={"logoutButton"}>Log Out</button>}
                </div>
            </nav>
            <main>
                {children}
            </main>
            {/* если добавить "global" в тэг "style", то стили станут глобальными */}
            <style jsx >{`
                * {
                    padding:0;
                    margin:0;
                }
                nav{
                    position:fixed;
                    top:0;
                    height:60px;
                    left:0;
                    right:0;
                    width:100%;
                    background-color:black;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                }
                a{
                    color:white;
                    text-decoration:none;
                    padding:10px;
                }
                main{
                    margin-top:60px;
                }
                .nav__secondaryButtons{
                    position:absolute;
                    right:0;
                    margin-right:1%;
                }
                .logoutButton{
                    background:none;
                    color:white;
                    border:none;
                    font-size:.9rem;
                    cursor:pointer;
                    outline:none;
                }
            `}
            </style>
        </Fragment>
    )
}