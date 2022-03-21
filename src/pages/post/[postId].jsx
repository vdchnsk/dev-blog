import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { TextareaAutosize } from '@material-ui/core'
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft'
import Button from '@material-ui/core/Button'

import { MainLayout } from '../../components/MainLayout'
import { Loader } from '../../components/Loader'
import PostStats from '../../components/posts/PostStats'
import { PostTags } from '../../components/posts/PostTags'

import { API } from '../../constants/API'

import styles from '../../styles/posts/post_details_page.module.scss'

export async function getServerSideProps({ params }) {
    const responce = await fetch(`${API.mockUri}posts/${params.postId}`)
    const postData = await responce.json()

    return { props: { postData: postData } }
}

export default function Post({ postData }) {
    const [post, setPost] = useState(postData)
    const [commentValue, setCommentValue] = useState('')
    const router = useRouter()

    const inputCommentRef = useRef()

    if (!post) {
        return (
            <MainLayout>
                <Loader />
            </MainLayout>
        )
    }
    return (
        <MainLayout title={post.title}>
            <div className={styles.main}>
                <div className={styles.post}>
                    <div className={styles.post__content}>
                        <div className={styles.post__content__heading}>
                            <h3 style={{ width: '50%' }}>
                                {post.author}{' '}
                                <span style={{ opacity: '50%', fontSize: '.9rem', fontWeight: '400' }}>
                                    {post.date}
                                </span>
                            </h3>
                            <div className={styles.post__content__heading__stats}>
                                <PostStats liked={post.liked} watched={post.watched} />{' '}
                                <PostTags tagsList={post.tags} />
                            </div>
                            <h1>{post.title}</h1>
                            <hr style={{ opacity: '50%' }} />
                        </div>
                        <div className={styles.post__content__body}>
                            <p>{post.body}</p>
                        </div>
                        <div className={styles.post__content__footer}>
                            <Link href="/posts">
                                <a style={{ display: 'flex', alignItems: 'center', width: '10%' }}>
                                    Get back <SubdirectoryArrowLeftIcon />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.postComments}>
                    <div className={styles.postComments__content}>
                        <div className={styles.postComments__content__heading}>
                            <h3 style={{ color: '#4c4c4c' }}>
                                Комментарии <span style={{ color: 'black' }}>{post.comments.length}</span>
                            </h3>
                            <hr style={{ opacity: '40%' }} />
                        </div>
                        <div className={styles.postComments__content__body}>
                            <div className={styles.postComments__content__body__comments}>
                                {post.comments.map((comment) => (
                                    <div
                                        style={{ padding: '1%' }}
                                        key={comment.id}
                                        className={styles.comments__comment}
                                    >
                                        <div
                                            style={{ fontWeight: '500', paddingBottom: '1%' }}
                                            className={styles.comment__heading}
                                        >
                                            <span>{comment.author}</span>{' '}
                                            <span style={{ margin: '0 10px', fontWeight: '400', fontSize: '.8rem' }}>
                                                {comment.date}
                                            </span>
                                        </div>
                                        <div className={styles.comment__body}>
                                            <span>{comment.value}</span>
                                        </div>
                                        <div className={styles.comment__footer}>
                                            <button
                                                onClick={() => {
                                                    inputCommentRef.current.focus()
                                                    setCommentValue(comment.author + ',')
                                                }}
                                                className={styles.comment__footer__replyBut}
                                                style={{
                                                    marginTop: '1%',
                                                    fontSize: '.9rem',
                                                    color: 'black',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: '0',
                                                    paddingBottom: '3px',
                                                }}
                                            >
                                                reply
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.comment__actions}>
                                <TextareaAutosize
                                    onChange={(e) => setCommentValue(e.target.value)}
                                    value={commentValue}
                                    ref={inputCommentRef}
                                    style={{
                                        minHeight: '50px',
                                        minWidth: '30%',
                                        maxWidth: '60%',
                                        padding: '10px',
                                        height: '150px',
                                        width: '50%',
                                        fontFamily: 'Roboto',
                                    }}
                                    rowsMax={10}
                                    aria-label="maximum height"
                                    placeholder="Write down your comment!"
                                />
                                <Button
                                    style={{
                                        color: '#fff',
                                        background: '#49AE92',
                                        margin: '0 10px',
                                        maxHeight: '30px',
                                        width: '190px',
                                    }}
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
