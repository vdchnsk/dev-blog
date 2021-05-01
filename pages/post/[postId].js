import {useState, useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MainLayout } from '../../components/MainLayout'
import { Loader } from '../../components/Loader'
import { PostStats } from '../../components/posts/PostStats'
import { PostTags } from '../../components/posts/PostTags'
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import { TextareaAutosize } from '@material-ui/core'

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
            <MainLayout >
                <Loader/>
            </MainLayout>
        )
    }
    return (
        <MainLayout title={post.title}>
            <div className="main">
                <div className="post">
                    <div className="post__content">
                        <div className="post__content__heading">
                            <h3 style={{width:"50%"}}>{post.author} <span style={{opacity:"50%", fontSize:".9rem", fontWeight:"400"}}>{post.date}</span></h3>
                            <div className="post__content__heading__stats">
                                <PostStats liked={post.liked} watched={post.watched}/> <PostTags tagsList={post.tags}/>
                            </div>
                            <h1>{post.title}</h1>
                            <hr style={{opacity:"50%"}}/>
                        </div>
                        <div className="post__content__body">
                            <p>{post.body}</p>
                        </div>
                        <div className="post__content__footer">
                            <Link href="/posts"><a style={{display:"flex", alignItems:"center"}}>Get back <SubdirectoryArrowLeftIcon/></a></Link>
                        </div>
                    </div>
                </div>
                <div className="postComments">
                <div className="postComments__content">
                    <div className="postComments__content__heading">
                        <h3 style={{color:"#4c4c4c"}}>Комментарии <span style={{color:"black"}}>{"3"}</span></h3>
                        <hr style={{opacity:"40%"}}/>
                        <TextareaAutosize style={{minHeight:"50px",minWidth:"30%", padding:"10px", height:"150px", width:"50%", fontFamily:"Roboto"}} rowsMax={10} aria-label="maximum height" placeholder="Write down your comment!"/>
                    </div>
                </div>
            </div>
            </div>
            <style jsx >{`
                .main{
                    width:100%;
                    display:flex;
                    justify-content:center;
                    align-items: center;
                    flex-direction:column;
                }
                .post{
                    width: 55%;
                }
                .postComments{
                    width: 55%;
                }
                
            `}</style>
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