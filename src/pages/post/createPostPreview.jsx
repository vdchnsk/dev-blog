import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { MainLayout } from '../../components/MainLayout'
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft'
import Link from 'next/link'
import { PostTags } from '../../components/post/PostTags'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'

import styles from '../../styles/create_post_page/create_post_preview.module.scss'

export default function Post({}) {
    const router = useRouter()
    const globalState = useSelector((state) => state)

    const post = {
        title: globalState.article.title,
        body: globalState.article.body,
        tags: globalState.article.tags,
    }
    // const PostBody = new DOMParser().parseFromString(post.body, "text/xml");

    return (
        <MainLayout title={`${post.title} - Preview`}>
            <div className={styles.main}>
                <div className={styles.post}>
                    <div className={styles.post__content}>
                        <div className={styles.post__content__heading}>
                            <h1>{post.title}</h1>
                            <div className={styles.post__content__heading__stats}>
                                <PostTags tagsList={post.tags} />
                            </div>
                            <hr style={{ opacity: '50%' }} />
                        </div>
                        <div className={styles.post__content__body}>
                            <p>{parse(post.body)}</p>
                        </div>
                        <div className={styles.post__content__footer}>
                            <Link href="/post/createPost">
                                <a style={{ display: 'flex', alignItems: 'center', width: '10%' }}>
                                    Get back <SubdirectoryArrowLeftIcon />
                                </a>
                            </Link>
                            <button
                                className={styles.footer__tags__button}
                                onClick={() => {
                                    console.log('upload')
                                }}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
