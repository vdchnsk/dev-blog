import {useState , useEffect} from 'react'
import Link from "next/link";
import Head from "next/head";
import Image from 'next/image'
import { MainLayout } from "../components/MainLayout";
import { Loader } from '../components/Loader';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';

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

    const tags = [
        {
            "value":"programming",
            "color":"red"
        } 
    ]
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
            <div className="feeds">
                <div className="feeds__newsFeed">
                    <h1>Posts</h1>
                    <ul>
                        {posts.map(post => (
                            <div className="newsBlock">
                                <li key={post.id}>
                                    <div className="news__heading">
                                        <Link className="news__heading__link" href={`/post/[id]`} as={`/post/${post.id}`}><a> {post.title} </a></Link>
                                        <div className="news__heading__stats">
                                            <span className="news__heading__stats__stat news__heading__stats__likes"><FavoriteBorderIcon style={{color: "#ff00e0",marginRight:"4px"}}/>{post.liked}</span>
                                            <span className="news__heading__stats__stat news__heading__stats__watched"><VisibilityIcon style={{color: "#4780e6", marginRight:"4px"}} />{post.watched}</span>
                                        </div>
                                        <div className="news__heading__stats__tags">
                                                {post.tags.map(tag =>(
                                                    <span style={{marginRight:"5px", opacity:"75%", fontWeight:"500", borderRadius:"10px",padding:"5px", border: `2px solid ${tag.color}`, color:`${tag.color}`, cursor:"pointer"}}>{tag.value}</span>
                                                ))}
                                            </div>
                                        <hr/>
                                    </div>
                                    <div className="news__descriptin">{post.body}</div>
                                    <Image src={`/static/uploads/${post.preview}`} alt="post preview picture" width="1920" height="1080" />
                                    <div className="news__footer">
                                        <h4 style={{textAlign:"start"}} className="news__footer__item news__footer__news__date">{post.date}</h4>
                                        <h4 style={{textAlign:"end"}} className="news__footer__item news__footer__news__author">by {post.author}</h4>
                                    </div>
                                </li>
                            </div>
                            ))
                        }
                    </ul>
                </div>

                <div className="feeds__userFeed">

                </div>
            </div>


            <style jsx >{`
                .feeds{
                    width:100%;
                    display:flex;
                    justify-content:center;
                }
                .feeds__newsFeed{
                    display:flex;
                    flex-direction:column;
                    width: 48%;
                }
                .newsBlock{
                    list-style: none;
                    margin-bottom: 2%;
                    border-radius:5px;
                    display:block;
                    padding:10px;
                }
                .news__heading__stats{
                    align-items: center;
                    display:flex;
                }
                .news__heading__stats__likes{
                    cursor:pointer;
                }
                .news__heading__stats__stat{
                    display:flex;
                    margin: 10px 20px 0 0;
                }
                .news__heading__stats__tags{
                    margin:2% 0 2% 0;
                    display:flex;
                }
                .news__descriptin{
                    text-align: justify;
                    max-height: 200px;
                    overflow: hidden;
                    margin-bottom: 1%;
                }
                .news__footer{
                    display:flex;
                }
                ul{
                    justify-content:center;
                    padding:0;
                }
                a{
                    font-size: 1.9em;
                    color: black;
                    font-weight: 500;
                }
                .news__footer__item{
                    width:50%;
                    opacity:60%;
                }
            `}
            </style>
        </MainLayout>
    )
}

Posts.getInitialProps = async (ctx) => { // getInitialProps хорошо подходит тогда, когда необходимо взаимодействовать с фронтом
    if (!ctx.req){
        return {posts : null}
    }
    const responce = await fetch("http://localhost:4200/posts")
    const posts = await responce.json()

    return {posts}
}