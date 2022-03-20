import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import router from 'next/router'
import randomColor from 'randomcolor'
import validator from 'validator'

import PublishIcon from '@material-ui/icons/Publish'
import { TextareaAutosize, TextField } from '@material-ui/core'

import { addArticleInfo } from '../redux/actions/articleAddingReducerActions'
import { showAlert } from '../redux/actions/alertActions'

import { MainLayout } from '../../components/MainLayout'
import { PostTags } from '../../components/post/PostTags'
import { Notification } from '../../components/Notification'

import { API } from '../../../constants/API'

import styles from '../../../styles/create_post_page/create_post_page.module.scss'

export default function CreatePost({ tags, BackupTags }) {
    const globalState = useSelector((state) => state)
    const dispatch = useDispatch()

    const [postTitle, setPostTitle] = useState(globalState.article.title)
    const [postDescription, setPostDescription] = useState(globalState.article.description)
    const [postPreview, setPostPreview] = useState(globalState.article.preview)
    const [postBody, setPostBody] = useState(globalState.article.body)

    const [chosenTags, setChosenTags] = useState(globalState.article.tags)
    const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(true)
    const [postTagsFilled, setPostTagsFilled] = useState('')
    const [postTags, setPostTags] = useState(globalState.article.tags)

    const bodyInput = useRef()

    const KeyCheck = (event) => {
        if (event.keyCode === 13) {
            postTagsFilled != '' && addToPostTags({ chosenTags }, postTagsFilled)
        }
        document.removeEventListener('keydown', KeyCheck)
    }

    useEffect(() => {
        document.addEventListener('keydown', KeyCheck)
    }, [postTagsFilled])

    const modifyText = (tag) => {
        setPostBody(postBody + tag)
        bodyInput.current.focus()
    }

    const filtredTags = chosenTags.filter((tag) => {
        return tag.value.toLowerCase().includes(postTagsFilled.toLowerCase())
    })

    const ACItemClickHandler = (e) => {
        setPostTagsFilled(e.target.textContent)
        setIsAutoCompleteOpen(false)
        addToPostTags({ chosenTags }, e.target.textContent)
    }

    const setIsAutoCompleteOpenHandler = () => {
        setIsAutoCompleteOpen(true)
    }

    const addToPostTags = ({ chosenTags }, exectTag) => {
        if (chosenTags.findIndex((i) => i.value === exectTag) !== -1) {
            let indexOfElement = chosenTags.findIndex((i) => i.value === exectTag)

            if (postTags.length == 3) {
                dispatch(showAlert('Максимольное кол-во тэгов - 3', 'warning'))
                return setPostTagsFilled('')
            }

            if (postTags.includes(chosenTags[indexOfElement])) {
                dispatch(showAlert(`Тэг "${exectTag}" уже был добавлен!`, 'warning'))
                return setPostTagsFilled('')
            }

            postTags.push(chosenTags[indexOfElement])
            chosenTags.splice(1, indexOfElement)
            setPostTagsFilled('')
        } else {
            if (postTags.length == 3) {
                dispatch(showAlert('Максимольное кол-во тэгов - 3', 'warning'))
                return setPostTagsFilled('')
            }

            if (postTags.findIndex((i) => i.value.toLowerCase() === exectTag.toLowerCase()) == 0) {
                dispatch(showAlert(`Тэг "${exectTag}" уже был добавлен!`, 'warning'))
                return setPostTagsFilled('')
            }

            const newTag = {
                id: Math.floor(Math.random() * 1000000),
                value: exectTag,
                color: randomColor(),
            }

            postTags.push(newTag)

            setPostTagsFilled('')
        }
    }

    const clearTags = () => {
        setPostTags([])
        setChosenTags(BackupTags.slice(0))
        return
    }

    const stransferData = () => {
        if (
            validator.isEmpty(postTitle) == false &&
            validator.isEmpty(postDescription) == false &&
            validator.isEmpty(postPreview) == false &&
            validator.isEmpty(postBody) == false &&
            chosenTags !== []
        ) {
            dispatch(addArticleInfo(postTitle, postDescription, postPreview, postBody, postTags))

            return router.push('/post/createPostPreview')
        }

        return dispatch(showAlert('Вы заполнили не все нужные поля!', 'warning'))
    }

    return (
        <MainLayout title={'Create new post ✍ '}>
            <Notification />
            <div className={styles.wrapper}>
                <div className={styles.newPost__content}>
                    <div className={styles.newPost__content__header}>
                        <h1>New article 📝</h1>
                    </div>
                    <div className={styles.newPost__content__main}>
                        <div className={styles.newPost__content__main__metaInpust}>
                            <TextField
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                                style={{ width: '60%', margin: '10px 0px' }}
                                className={styles.metaInput}
                                color={'secondary'}
                                label="Title"
                            />
                            <TextareaAutosize
                                onChange={(e) => setPostDescription(e.target.value)}
                                value={postDescription}
                                style={{
                                    overflow: 'auto',
                                    minHeight: '100px',
                                    minWidth: '100%',
                                    maxWidth: '100%',
                                    padding: '10px',
                                    fontFamily: 'Roboto',
                                }}
                                aria-label="maximum height"
                                placeholder="Description of your article"
                            />
                            <label htmlFor="upload" style={{ cursor: 'pointer', width: '24%', margin: '10px 0px' }}>
                                <div
                                    tabIndex="0"
                                    className={styles.uploadFileButton}
                                    style={{
                                        padding: '5px',
                                        borderRadius: '3px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        background: '#49AE92',
                                        color: 'white',
                                    }}
                                >
                                    <input
                                        onChange={(e) => setPostPreview(e.target.value)}
                                        id="upload"
                                        style={{
                                            cursor: 'pointer',
                                            height: '100%',
                                            width: '100%',
                                            opacity: '0',
                                            zIndex: '10',
                                            position: 'absolute',
                                        }}
                                        type="file"
                                        hidden
                                    />
                                    <PublishIcon />
                                    <span
                                        style={{
                                            marginLeft: '1px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {postPreview !== '' ? postPreview : 'Post preview'}
                                    </span>
                                </div>
                            </label>
                        </div>
                        <div className={styles.newPost__content__main__aricleInput}>
                            <div className={styles.newPost__content__main__aricleInput__toolbar}>
                                <button
                                    onClick={() => {
                                        modifyText('<strong></strong>')
                                    }}
                                    className={styles.toolbar__element}
                                >
                                    <strong>bold</strong>
                                </button>
                                <button
                                    onClick={() => {
                                        modifyText('<i></i>')
                                    }}
                                    className={styles.toolbar__element}
                                >
                                    <i>italic</i>
                                </button>
                                <button
                                    onClick={() => {
                                        modifyText('<h1></h1>')
                                    }}
                                    className={styles.toolbar__element}
                                >
                                    <span>h1</span>
                                </button>
                                <button
                                    onClick={() => {
                                        modifyText('<h2></h2>')
                                    }}
                                    className={styles.toolbar__element}
                                >
                                    <span>h2</span>
                                </button>
                                <button
                                    onClick={() => {
                                        modifyText('<h3></h3>')
                                    }}
                                    className={styles.toolbar__element}
                                >
                                    <span>h3</span>
                                </button>
                                <button
                                    onClick={() => {
                                        modifyText('<h4></h4>')
                                    }}
                                    className={styles.toolbar__element}
                                >
                                    <span>h4</span>
                                </button>
                                <button
                                    onClick={() => {
                                        modifyText('•')
                                    }}
                                    className={styles.toolbar__element}
                                >
                                    list
                                </button>
                                <button
                                    onClick={() => {
                                        modifyText('<img></img>')
                                    }}
                                    className={styles.toolbar__element}
                                    style={{ borderRight: '2px solid #131039' }}
                                >
                                    image
                                </button>
                            </div>
                            <TextareaAutosize
                                ref={bodyInput}
                                value={postBody}
                                onChange={(e) => setPostBody(e.target.value)}
                                onFocus={() => {
                                    let input = document.querySelector('.textStat')
                                    input.classList.toggle('active')
                                }}
                                onBlur={() => {
                                    let input = document.querySelector('.textStat')
                                    input.classList.toggle('active')
                                }}
                                style={{
                                    overflow: 'auto',
                                    minHeight: '400px',
                                    minWidth: '100%',
                                    maxWidth: '100%',
                                    padding: '10px',
                                    height: '150px',
                                    width: '50%',
                                    fontFamily: 'Roboto',
                                }}
                                rowsMax={10}
                                aria-label="maximum height"
                                placeholder="Body of your article"
                            />
                        </div>
                        <div
                            className="textStat"
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                background: 'white',
                                borderRadius: '0px 0px 10px 10px',
                                border: '1px solid #131039',
                                transform: 'translate(0px, -21px)',
                            }}
                        >
                            <div style={{ opacity: '65%', padding: '10px' }}>{postBody.length} symbols</div>
                            <div style={{ padding: '0 10px', opacity: '65%', padding: '10px' }}>
                                {postBody.split(/\s+/).length - 1} words
                            </div>
                        </div>
                    </div>
                    <div className={styles.newPost__content__footer}>
                        <div
                            className={styles.footer__tags}
                            style={{ margin: '0px 0 25px 0px', display: 'flex', flexDirection: 'row' }}
                        >
                            <div
                                className={(styles.footer__tags__item, styles.footer__tags__tagChoosing)}
                                style={{ display: 'flex', flexDirection: 'column' }}
                            >
                                <span style={{ width: '100%', fontWeight: '500' }}>
                                    Choose not more than 3 suiteble tags
                                </span>
                                <TextField
                                    disabled={postTags.length === 3}
                                    onClick={setIsAutoCompleteOpenHandler}
                                    onChange={(e) => setPostTagsFilled(e.target.value)}
                                    value={postTagsFilled}
                                    style={{ width: '53%', position: 'relative' }}
                                    className={styles.metaInput}
                                    color={'secondary'}
                                    label="suiteble tag"
                                />
                                <ul
                                    style={{ listStyle: 'none', padding: '0', margin: '0', width: '53%' }}
                                    className={styles.tag__autocomplete}
                                >
                                    {postTagsFilled &&
                                        isAutoCompleteOpen &&
                                        filtredTags.map((tag) => {
                                            return (
                                                <li
                                                    onClick={ACItemClickHandler}
                                                    className={styles.tag__autocomplete__item}
                                                    key={tag.id}
                                                >
                                                    {tag.value}
                                                </li>
                                            )
                                        })}
                                </ul>
                            </div>
                            <div className={`${styles.footer__tags__item}`}>
                                <span style={{ width: '100%', fontWeight: '500' }}>
                                    Tags:
                                    <span>
                                        {postTags.length !== 0 && (
                                            <button tabIndex="0" onClick={clearTags} className={styles.clearTags}>
                                                clear
                                            </button>
                                        )}
                                    </span>
                                </span>
                                <PostTags tagsList={postTags} />
                            </div>
                        </div>
                        <button className={styles.footer__tags__button} onClick={stransferData}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export async function getServerSideProps({ req }) {
    if (!req) {
        return { tags: null }
    }
    const responce = await fetch(`${API.mockUri}tags`)
    const tags = await responce.json()

    return {
        props: {
            tags: tags,
            BackupTags: tags,
        },
    }
}
