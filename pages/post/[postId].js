import {useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/router'
import { MainLayout } from '../../components/MainLayout'
import { Loader } from '../../components/Loader'
import { PostStats } from '../../components/posts/PostStats'
import { PostTags } from '../../components/posts/PostTags'
import { TextareaAutosize } from '@material-ui/core'
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import Button from '@material-ui/core/Button'
import Link from 'next/link'

export default function Post ({ post:serverPost }) {
    const [post , setPost] = useState(serverPost)
    const [commentValue, setCommentValue] = useState("")
    const router = useRouter()

    const unputCommentRef = useRef()

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
                            <Link href="/posts"><a style={{display:"flex", alignItems:"center", width:"10%"}}>Get back <SubdirectoryArrowLeftIcon/></a></Link>
                        </div>
                    </div>
                </div>
                <div className="postComments">
                <div className="postComments__content">
                    <div className="postComments__content__heading">
                        <h3 style={{color:"#4c4c4c"}}>Комментарии <span style={{color:"black"}}>{post.comments.length}</span></h3>
                        <hr style={{opacity:"40%"}}/>
                    </div>
                    <div className="postComments__content__body">
                        <div className="postComments__content__body__comments">
                            {post.comments.map(comment => (
                                <div style={{padding:"1%"}} key={comment.id} className="body__comments__comment">
                                    <div style={{fontWeight:"500", paddingBottom:"1%"}} className="body__comments__comment__heading">
                                        <span>{comment.author}</span> <span style={{margin:"0 10px", fontWeight:"400", fontSize:".8rem"}}>{comment.date}</span>
                                    </div>
                                    <div className="body__comments__comment__body">
                                        <span>{comment.value}</span>
                                    </div>
                                    <div className="body__comments__comment__footer">
                                        <button onClick={()=>{
                                            unputCommentRef.current.focus()
                                            setCommentValue(comment.author+",")
                                            }}className="body__comments__comment__footer__replyBut" style={{marginTop:"1%",fontSize:".9rem",color:"black", background:"none", border:"none", cursor:"pointer",padding:"0",paddingBottom:"3px"}}>reply</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="body__comments__comment__actions">
                            <TextareaAutosize 
                                onChange={(e) => setCommentValue(e.target.value)} 
                                value={commentValue} ref={unputCommentRef} 
                                style={{minHeight:"50px", minWidth:"30%", maxWidth:"60%", padding:"10px", height:"150px", width:"50%", fontFamily:"Roboto"}} 
                                rowsMax={10} 
                                aria-label="maximum height" 
                                placeholder="Write down your comment!"
                            />
                            <Button style={{background:"#e2e2e2", margin:"0 10px", maxHeight:"30px", width:"190px"}} color={"secondary"}>Send</Button>
                        </div>
                        
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
                .body__comments__comment{
                    color: #3e3e3e;
                    display: flex;
                    flex-direction: column;
                    margin: 20px 0px 20px 0px;
                }
                .body__comments__comment__footer__replyBut:hover{
                    text-decoration:underline;
                }
                .body__comments__comment__actions{
                    width:100%;
                    display:flex;
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