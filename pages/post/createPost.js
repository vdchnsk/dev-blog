import { useEffect, useRef, useState } from "react";
import { TextareaAutosize, TextField } from "@material-ui/core";
import { MainLayout } from "../../components/MainLayout";
import {PostTags} from "../../components/posts/PostTags"
import { useDispatch, useSelector } from 'react-redux'
import { addArticleInfo } from "../redux/actions/articleAddingReducerActions";
import { showAlert } from "../redux/actions/alertActions";
import {Notification} from "../../components/Notification"
import PublishIcon from '@material-ui/icons/Publish';
import router from 'next/router';
import randomColor from "randomcolor"

export default function CreatePost({tags, BackupTags}){
    const globalState = useSelector(state => state) 
    const dispatch = useDispatch()

    const [postTitle, setPostTitle] = useState(globalState.article.title)
    const [postDescription, setPostDescription] = useState(globalState.article.description)
    const [postPreview, setPostPreview] = useState("")
    const [postBody, setPostBody] = useState(globalState.article.body)
    
    const [chosenTags, setChosenTags] = useState(tags)
    const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(true)
    const [postTagsFilled, setPostTagsFilled] = useState("")
    const [postTags, setPostTags] = useState(globalState.article.tags)
    
    const bodyInput = useRef()
    
    
    const KeyCheck = (event) => {
        if(event.keyCode === 13) {
            postTagsFilled != "" ? addToPostTags({chosenTags}, postTagsFilled) : null
        }
        document.removeEventListener("keydown", KeyCheck)
    }
    useEffect(()=>{
        document.addEventListener("keydown", KeyCheck)
    }, [postTagsFilled])

    const modifyText =  tag => {
        setPostBody(postBody + tag)
        bodyInput.current.focus()
    }
    
    const filtredTags = chosenTags.filter(tag=>{
        return tag.value.toLowerCase().includes(postTagsFilled.toLowerCase())
    })
    const ACItemClickHandler = (e) =>{
        setPostTagsFilled(e.target.textContent)
        setIsAutoCompleteOpen(false)
        addToPostTags({chosenTags}, e.target.textContent)
        
    }
    const setIsAutoCompleteOpenHandler = ()=>{
        setIsAutoCompleteOpen(true)
    }
    const addToPostTags = ({chosenTags}, exectTag) =>{
        if (chosenTags.findIndex(i => i.value === exectTag) !== -1){
            let indexOfElement = chosenTags.findIndex(i => i.value === exectTag)

            if (postTags.length == 3){
                dispatch(showAlert("Максимольное кол-во тэгов - 3", "warning")) // против мудаков, которые выполнят функцию на фронете без инпута
                return setPostTagsFilled("")
            } else if (postTags.includes(chosenTags[indexOfElement])){
                dispatch(showAlert(`Тэг "${exectTag}" уже был добавлен!`, "warning"))
                return setPostTagsFilled("")
            }

            postTags.push(chosenTags[indexOfElement])
            chosenTags.splice(1,indexOfElement)
            setPostTagsFilled("")

        } else {

            if (postTags.length == 3){
                dispatch(showAlert("Максимольное кол-во тэгов - 3", "warning"))
                return setPostTagsFilled("")
            } else if (postTags.findIndex(i => i.value.toLowerCase() === exectTag.toLowerCase()) == 0){ //Если массив уже готовых тегов содержит элемент с таким же значаним, как ввел пользователь(т.е. тег повторяется)(метод в таком случае выводит "0"), выдает ошибку о том, что тег уже был добавлен
                dispatch(showAlert(`Тэг "${exectTag}" уже был добавлен!`, "warning"))
                return setPostTagsFilled("")
            }
            
            let newTag = {
                "id":Math.floor(Math.random() * 1000000) * 1,
                "value":exectTag,
                "color":randomColor()
            }
            postTags.push(newTag)

            setPostTagsFilled("")
        }
    }
    const clearTags = () =>{
        setPostTags([])
        setChosenTags(BackupTags.slice(0)) //создание дубликата бэкап-массива, иначе будет происходить мутация даже этого самого бэкап-массива
        return
    }
    
    return (
        <MainLayout title={"Create new post ✍ "}>
            <Notification/>
            <div className="wrapper">
                <div className="newPost__content">
                    <div className="newPost__content__header">
                        <h1>New article 📝</h1>
                    </div>
                    <div className="newPost__content__main">
                        <div className="newPost__content__main__metaInpust">
                            <TextField value={postTitle} onChange={(e) => setPostTitle(e.target.value)} style={{width:"60%",margin:"10px 0px"}} className="metaInput" color={"secondary"} label="Title" />
                            <TextareaAutosize
                                onChange={(e) => setPostDescription(e.target.value)}
                                value={postDescription}
                                style={{overflow:"auto", minHeight:"100px", minWidth:"100%", maxWidth:"100%", padding:"10px", fontFamily:"Roboto"}} 
                                aria-label="maximum height" 
                                placeholder="Description of your article"/>
                            <label htmlFor="upload" style={{cursor:"pointer", width:"24%",margin:"10px 0px"}} >
                                 <div tabIndex="0" className="uploadFileButton" style={{padding:"5px", borderRadius:"3px", display:"flex",justifyContent:"center",alignItems:"center", background:"black", color:"white"}}>
                                    <input onChange={(e) => setPostPreview(e.target.value)} id="upload" style={{cursor:"pointer", height:"100%", width:"100%", opacity:"0",zIndex:"10", position:"absolute"}} type="file" hidden/>
                                    <PublishIcon/>
                                    <span style={{marginLeft:"1px",whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"} }>{postPreview !== ""?postPreview:"Post preview"}</span>
                                </div> 
                            </label>
                        </div>
                        <div className="newPost__content__main__aricleInput">
                            <div className="newPost__content__main__aricleInput__toolbar">
                                <button onClick={()=>{modifyText("<strong></strong>")}} className="toolbar__element"><strong>bold</strong></button>
                                <button onClick={()=>{modifyText("<i></i>")}} className="toolbar__element"><i>italic</i></button>
                                <button onClick={()=>{modifyText("<h1></h1>")}} className="toolbar__element"><span>h1</span></button>
                                <button onClick={()=>{modifyText("<h2></h2>")}} className="toolbar__element"><span>h2</span></button>
                                <button onClick={()=>{modifyText("<h3></h3>")}} className="toolbar__element"><span>h3</span></button>
                                <button onClick={()=>{modifyText("<h4></h4>")}} className="toolbar__element"><span>h4</span></button>
                                <button onClick={()=>{modifyText("•")}} className="toolbar__element">list</button>
                                <button onClick={()=>{modifyText("<img></img>")}} className="toolbar__element" style={{borderRight:"2px solid black"}}>image</button>
                            </div>
                            <TextareaAutosize
                                ref = {bodyInput}
                                value={postBody}
                                onChange={(e) => setPostBody(e.target.value)}
                                onFocus={()=>{
                                    let input = document.querySelector(".textStat")
                                    input.classList.toggle("active")
                                }}
                                onBlur={()=>{
                                    let input = document.querySelector(".textStat")
                                    input.classList.toggle("active")
                                }}
                                style={{overflow:"auto", minHeight:"400px", minWidth:"100%", maxWidth:"100%", padding:"10px", height:"150px", width:"50%", fontFamily:"Roboto"}} 
                                rowsMax={10} 
                                aria-label="maximum height" 
                                placeholder="Body of your article"/>

                        </div>
                        <div className="textStat" style={{width:"100%",display:"flex",flexDirection:"row", background:"white",borderRadius:"0px 0px 10px 10px", border:"1px solid black", transform:"translate(0px, -21px)"}}>
                            <div style={{opacity:"65%", padding:"10px"}}>{postBody.length} symbols</div>
                            <div style={{padding:"0 10px", opacity:"65%", padding:"10px"}}>{postBody.split(/\s+/).length -1} words</div>
                        </div>

                    </div>
                    <div className="newPost__content__footer">
                        <div className="footer__tags " style={{margin:"0px 0 25px 0px", display:"flex", flexDirection:"row"}}>
                            <div className="footer__tags__item footer__tags__tagChoosing" style={{display:"flex", flexDirection:"column"}}>
                                <span style={{width:"100%", fontWeight:"500"}}>Choose not more than 3 suiteble tags</span>
                                <TextField disabled={postTags.length === 3} onClick={setIsAutoCompleteOpenHandler} onChange={(e) => setPostTagsFilled(e.target.value)} value={postTagsFilled} style={{width:"53%", position:"relative"}} className="metaInput" color={"secondary"} label="suiteble tag" />
                                <ul style={{listStyle:"none", padding:"0", margin:"0", width:"53%"}} className="tag__autocomplete">
                                    {
                                        postTagsFilled && isAutoCompleteOpen ? filtredTags.map((tag) => { return<li onClick={ACItemClickHandler} className="tag__autocomplete__item" key={tag.id}>{tag.value}</li>}) : null
                                    }
                                </ul>
                            </div>
                            <div className="footer__tags__item footer__tags__suitebleTag">
                                <span style={{width:"100%", fontWeight:"500"}}>Tags: <span >{postTags.length !== 0 ?<button tabIndex="0" onClick={clearTags} className="clearTags" >clear</button>:null}</span></span>
                                <PostTags tagsList={postTags}/>
                            </div>
                        </div>
                        <button className="footer__tags__button" onClick={()=>{
                            dispatch(addArticleInfo(postTitle, postDescription, postPreview, postBody, postTags))
                            router.push('/post/createPostPreview')
                        }}> Next </button>
                    </div>
                </div>
            </div>
            <style jsx >{`
                .wrapper{
                    width:100%;
                    height:100%;
                    display:flex;
                    justify-content:center;
                }
                .newPost__content{
                    width:55%;
                    height:93vh;
                }
                .newPost__content__main{
                    display:flex;
                    flex-direction:column;
                }
                .newPost__content__main__metaInpust{
                    display:flex;
                    flex-direction:column;
                }
                .toolbar__element{
                    cursor:pointer;
                    padding:10px;
                    border:0px;
                    border-left:2px solid black;
                    border-top:2px solid black;
                    border-bottom:2px solid black;
                    background:none;
                    margin:5px 0;
                    transition:.3s;
                }
                .toolbar__element:hover , .toolbar__element:focus{
                    background:black;
                    color:white;
                }
                .footer__tags{
                    display:flex;
                    flex-direction:column;
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
                .footer__tags__item{
                    width:50%;
                }
                .tag__autocomplete__item{
                    padding:10px 10px 10px 0px;
                    cursor:pointer;
                    background:white;
                    border-bottom:1px solid gainsboro;
                }
                .tag__autocomplete__item:hover, .tag__autocomplete__item:focus{
                    background:whitesmoke;
                    transition:.3s;
                }
                .clearTags{
                    background:none;
                    font-size: .9rem;
                    border:none;
                    font-weight: 400;
                    opacity: 70%;
                    cursor:pointer;
                }
                .clearTags:hover, .clearTags:focus{
                    transition:.3s;
                    text-decoration:underline;
                } 
                .textStat.active{
                    // outline: 1px solid black;
                    border: 2px solid black !important;
                }

                input[type=file]::-webkit-file-upload-button {
                    display:"none";
                }
                @media(max-width:1340px){
                    .newPost__content{
                        width:70%  
                    }
                }
                @media(max-width:800px){
                    .newPost__content{
                        width:80%  
                    }
                }
                @media(max-width:660px){
                    .newPost__content{
                        width:100%  
                    }
                }
            `}
            </style>
        </MainLayout>
    )
}
export async function getServerSideProps({req}) {
    if (!req){
        return {tags : null}
    }
    const responce = await fetch(`http://localhost:4200/tags`)
    const tags = await responce.json()

    return {
        props: {
            tags:tags,
            BackupTags:tags
        }
    }
        
}