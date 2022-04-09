import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import Router from 'next/router'

import { MainLayout } from '@components/MainLayout'
import { Loader } from '@components/Loader'
import { PostTags } from '@components/posts/PostTags'
import PostStats from '@components/posts/PostStats'

import styles from '@styles/posts/posts_page.module.scss'
import { API } from '../../constants/API'

export async function getServerSideProps() {
    const responce = await fetch(`${API.mockUri}posts`)
    const postsData = await responce.json()

    return {
        props: {
            postsData: postsData,
        },
    }
}

export default function Posts({ postsData }) {
    const [posts, setPosts] = useState(postsData)
    const userData = useSelector((state) => state.auth)

    const redirectToCreatePostPage = () => {
        Router.push('./post/createPost')
    }
    if (!posts) {
        return (
            <MainLayout>
                <Loader />
            </MainLayout>
        )
    }

    return (
        <MainLayout title={'Posts 💻'}>
            <div className={styles.feeds}>
                <div className={styles.feeds__newsFeed}>
                    <div
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        className={styles.feeds__newsFeed__feedHeading}
                    >
                        <h1>POSTS 📃</h1>
                        {(userData.userRole == 'admin' || userData.userRole == 'creator') && (
                            <button onClick={redirectToCreatePostPage} className={styles.crateArticleButton}>
                                Создать статью
                            </button>
                        )}
                    </div>
                    <div className={styles.listOfPosts}>
                        {posts.map((post) => (
                            <div key={post.id} className={styles.newsBlock}>
                                <div className={styles.news__heading}>
                                    <Link
                                        className={styles.news__heading__link}
                                        href={`/post/[id]`}
                                        as={`/post/${post.id}`}
                                    >
                                        <div className={styles.postTitle}> {post.title} </div>
                                    </Link>
                                    <PostStats liked={post.liked} watched={post.watched} />
                                    <PostTags tagsList={post.tags} />
                                    <hr />
                                </div>
                                <div className={styles.news__descriptin}>{post.bodyPreview}</div>
                                <Image
                                    objectFit="cover"
                                    src={`/static/uploads/${post.preview}`}
                                    alt="post preview picture"
                                    // TODO: some solution for sizes needs to be found
                                    width="1920"
                                    height="1080"
                                />
                                <div className={styles.news__footer}>
                                    <h4
                                        style={{ textAlign: 'start' }}
                                        className={`${styles.news__footer__item} ${styles.news__footer__news__date}`}
                                    >
                                        {post.date}
                                    </h4>
                                    <h4
                                        style={{ textAlign: 'end' }}
                                        className={`${styles.news__footer__item} ${styles.news__footer__news__author}`}
                                    >
                                        by {post.author}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.feeds__userFeed}></div>
            </div>
        </MainLayout>
    )
}
