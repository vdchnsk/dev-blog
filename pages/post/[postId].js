import {useState, useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MainLayout } from '../../components/MainLayout'
import { Loader } from '../../components/Loader'

export default function Post ({ post:serverPost }) {
    const [post , setPost] = useState(serverPost)
    const router = useRouter()

    useEffect(()=>{
        const load = async () => {
            const responce = await fetch(`http://localhost:4200/posts/${router.query.postId}`)
            const data = await responce.json()
            setPost(data)
        }
        if(!serverPost){
            load()
        }
    }, [])

    if(!post){
        return (
            <MainLayout>
                <Loader/>
            </MainLayout>
        )
    }
    return (
        <MainLayout>
            <h1>{post.title}</h1>
            <hr/>
            <p>{post.body}</p>
            <Link href="/posts"><a>Get back</a></Link>
        </MainLayout>
    )
}

Post.getInitialProps = async (ctx) => {
    if (!ctx.req){
        return {post : null}
    }
    const responce = await fetch(`http://localhost:4200/posts/${ctx.query.postId}`)
    const post = await responce.json()

    return {post}
}