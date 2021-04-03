import {useState , useEffect} from 'react'
import Link from "next/link";
import Head from "next/head";
import { MainLayout } from "../components/MainLayout";
import { Loader } from '../components/Loader';


export default function Posts({ posts : serverPosts }){
    const [posts , setPosts] = useState(serverPosts)

    useEffect(() => {
        //frontend query
        const load = async () => {
            const responce = await fetch(`http://localhost:4200/posts`)
            const data = await responce.json()
            setPosts(data)
        }
        if(!serverPosts){
            load()
        }
    }, [])

    if(!posts){ //если посты не подгрузились , показывает лоадер
        return (
            <MainLayout>
                <Loader/>
            </MainLayout>
        )
    }
    return (
        <MainLayout>
            <Head>
                <title>Next | Posts</title>
            </Head>
            <h1>Статьи</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link href={`/post/[id]`} as={`/post/${post.id}`}>
                            <a> {post.title} </a>
                        </Link>
                    </li>
                    ))
                }
            </ul>
            <style jsx >{`
                ul{
                    padding:0;
                }
                li{
                    border-radius:5px;
                    width: 25%;
                    display:block;
                    margin-bottom:5px;
                    padding:10px;
                    background-color: rgb(230 230 230);
                }
                a{
                    font-size:1.1em;
                    color:#6b6b6b;
                }
            `}
            </style>
        </MainLayout>
    )
}

//backend query
Posts.getInitialProps = async (ctx) => { // getInitialProps хорошо подходит тогда, когда необходимо взаимодействовать с фронтом
    if (!ctx.req){
        return {posts : null}
    }
    const responce = await fetch("http://localhost:4200/posts")
    const posts = await responce.json()

    return {posts}
}