import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import router from 'next/router'
import randomColor from 'randomcolor'
import validator from 'validator'
import { TextareaAutosize, TextField } from '@material-ui/core'

import { addArticleInfo } from '../redux/actions/articleAddingReducerActions'
import { showAlert } from '../redux/actions/alertActions'

import { MainLayout } from '../../components/MainLayout'
import { PostTags } from '../../components/posts/PostTags'
import { Notification } from '../../components/Notification'

import { API } from '../../constants/API'

import styles from '../../styles/create_post_page/create_post_page.module.scss'
import { UploadButton } from '../../components/posts/CreatePost/UploadButton'
import { TextHighLightTools } from '../../components/posts/CreatePost/TextHighLightTools'

export async function getServerSideProps() {
    const responce = await fetch(`${API.mockUri}tags`)
    const tags = await responce.json()

    return {
        props: {
            tagsList: tags,
        },
    }
}

export default function CreatePost({ tagsList }) {
    const globalState = useSelector((state) => state)
    const dispatch = useDispatch()

    const [postTitle, setPostTitle] = useState(globalState.article.title)
    const [postDescription, setPostDescription] = useState(globalState.article.description)
    const [postPreview, setPostPreview] = useState(globalState.article.preview)
    const [postBody, setPostBody] = useState(globalState.article.body)

    const [chosenTags, setChosenTags] = useState(tagsList)
    const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(true)
    const [postTagsFilled, setPostTagsFilled] = useState('')
    const [postTags, setPostTags] = useState(globalState.article.tags)

    const listOfTextHightLightElements = ['strong', 'i', 'h1', 'h2', 'h3', 'h3', '•', 'image']

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

    const chooseAutoCompleteItem = (event) => {
        setPostTagsFilled(event.target.textContent)
        setIsAutoCompleteOpen(false)
        addToPostTags({ chosenTags }, event.target.textContent)
    }

    const setIsAutoCompleteOpenHandler = () => {
        setIsAutoCompleteOpen(true)
    }

    const addToPostTags = ({ chosenTags }, exectTag) => {
        if (chosenTags.findIndex((i) => i.value === exectTag) !== -1) {
            const indexOfElement = chosenTags.findIndex((element) => element.value === exectTag)

            if (postTags.length == 3) {
                dispatch(showAlert('Максимольное кол-во тэгов - 3', 'warning'))
                return setPostTagsFilled('')
            }

            if (postTags.some((element) => element.value == exectTag)) {
                dispatch(showAlert(`Тэг "${exectTag}" уже был добавлен!`, 'warning'))
                return setPostTagsFilled('')
            }

            setPostTags([...postTags, chosenTags[indexOfElement]])

            setChosenTags([...chosenTags.filter((element) => element != chosenTags[indexOfElement])])
            setPostTagsFilled('')
        } else {
            if (postTags.length == 3) {
                dispatch(showAlert('Максимольное кол-во тэгов - 3', 'warning'))
                return setPostTagsFilled('')
            }

            if (postTags.findIndex((element) => element.value.toLowerCase() === exectTag.toLowerCase()) == 0) {
                dispatch(showAlert(`Тэг "${exectTag}" уже был добавлен!`, 'warning'))
                return setPostTagsFilled('')
            }

            const newTag = {
                id: Math.floor(Math.random() * 1000000),
                value: exectTag,
                color: randomColor(),
            }

            setPostTags([...postTags, newTag])

            setPostTagsFilled('')
        }
    }

    const clearTags = () => {
        setPostTags([])
        setChosenTags([...tagsList])
        return
    }

    const transferDataToPreview = () => {
        if (
            validator.isEmpty(postTitle) == true ||
            validator.isEmpty(postDescription) == true ||
            validator.isEmpty(postPreview) == true ||
            validator.isEmpty(postBody) == true ||
            chosenTags.length == 0
        ) {
            return dispatch(showAlert('Вы заполнили не все нужные поля!', 'warning'))
        }

        dispatch(addArticleInfo(postTitle, postDescription, postPreview, postBody, postTags))

        return router.push('/post/createPostPreview')
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
                                onChange={(event) => setPostDescription(event.target.value)}
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
                            <UploadButton onChange={(event) => setPostPreview(event.target.value)} text={postPreview} />
                        </div>
                        <div className={styles.newPost__content__main__aricleInput}>
                            <TextHighLightTools
                                heightElements={listOfTextHightLightElements}
                                modifyTextMethod={modifyText}
                            />
                            <TextareaAutosize
                                ref={bodyInput}
                                value={postBody}
                                onChange={(event) => setPostBody(event.target.value)}
                                onFocus={() => {}}
                                onBlur={() => {}}
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
                        <div className={styles.textStat}>
                            <div style={{ opacity: '65%', padding: '10px' }}>{postBody.length} symbols</div>
                            <div style={{ padding: '0 10px', opacity: '65%', padding: '10px' }}>
                                {postBody.split(/\s+/).length - 1} words
                            </div>
                        </div>
                    </div>
                    <div className={styles.newPost__content__footer}>
                        <div className={styles.footer__tags}>
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
                                    onChange={(event) => setPostTagsFilled(event.target.value)}
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
                                    {postTagsFilled != '' &&
                                        isAutoCompleteOpen == true &&
                                        filtredTags.map((tag) => {
                                            return (
                                                <li
                                                    onClick={chooseAutoCompleteItem}
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
                                Tags:
                                <span>
                                    {postTags.length !== 0 && (
                                        <button tabIndex="0" onClick={clearTags} className={styles.clearTags}>
                                            clear
                                        </button>
                                    )}
                                </span>
                                <PostTags tagsList={postTags} />
                            </div>
                        </div>
                        <button className={styles.footer__tags__button} onClick={transferDataToPreview}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
