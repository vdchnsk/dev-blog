import {useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/router'
import { MainLayout } from '../../components/MainLayout'
import { Loader } from '../../components/Loader'
import  PostStats  from '../../components/posts/PostStats'
import { TextareaAutosize } from '@material-ui/core'
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import  {PostTags}  from '../../components/posts/PostTags'
import { useSelector } from 'react-redux'

export default function Post ({}) {
    const router = useRouter()
    const globalState = useSelector(state => state) 
    
    const post = {
        title:globalState.article.title,
        body:globalState.article.body,
        tags:globalState.article.tags,
    }
    return (
        <MainLayout title={`${post.title} - Preview`}>
            <div className="main">
                <div className="post">
                    <div className="post__content">
                        <div className="post__content__heading">
                            <h1>{post.title}</h1>
                            <div className="post__content__heading__stats">
                               <PostTags tagsList={post.tags}/>
                            </div>
                            <hr style={{opacity:"50%"}}/>
                        </div>
                        <div className="post__content__body">
                            <p>{post.body}</p>
                        </div>
                        <div className="post__content__footer">
                            <Link href="/post/createPost"><a style={{display:"flex", alignItems:"center", width:"10%"}}>Get back <SubdirectoryArrowLeftIcon/></a></Link>
                            <button className="footer__tags__button" onClick={()=>{
                                console.log("upload")//dummy
                            }}>Upload</button>
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
                .post__content__footer{
                    display:flex;
                    justify-content:space-between;
                }
                .footer__tags__button{
                    border-radius:8px;
                    margin-bottom:20px;
                    transition:.3s;
                    padding:10px;
                    width:30%;
                    color:black;
                    background:none;
                    border:2px solid black;
                    cursor:pointer;
                }
                .footer__tags__button:hover , .footer__tags__button:focus{
                    background:black;
                    color:white;
                }
                .post{
                    width: 55%;
                }
                @media(max-width:1340px){
                    .post{
                        width:70%  
                    }
                }
                @media(max-width:800px){
                    .post{
                        width:80%  
                    }
                }
                @media(max-width:660px){
                    .post{
                        width:100%  
                    }
                }
                
            `}</style>
        </MainLayout>
    )
}