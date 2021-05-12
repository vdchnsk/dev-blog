import { useEffect, useRef, useState } from "react";
import { TextareaAutosize, TextField } from "@material-ui/core";
import { MainLayout } from "../../components/MainLayout";
import PublishIcon from '@material-ui/icons/Publish';
import {PostTags} from "../../components/posts/PostTags"
var randomColor = require('randomcolor');



export default function CreatePost({tags}){
    const [postTitle, setPostTitle] = useState("")
    const [postDescription, setPostDescription] = useState("")
    const [postBody, setPostBody] = useState("")
    const [postPreview, setPostPreview] = useState("")

    const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(true)
    const [postTagsFilled, setPostTagsFilled] = useState("")
    const [postTags, setPostTags] = useState([])

    const modifyText =  tag => {
        setPostBody(postBody + tag)
        bodyInput.current.focus()
    }

    const filtredTags = tags.filter(tag=>{
        return tag.value.toLowerCase().includes(postTagsFilled.toLowerCase())
    })
    const ACItemClickHandler = (e) =>{
        setPostTagsFilled(e.target.textContent)
        setIsAutoCompleteOpen(false)
        addToPostTags({tags}, e.target.textContent)
        
    }
    const setIsAutoCompleteOpenHandler = ()=>{
        setIsAutoCompleteOpen(true)
    }
    const addToPostTags = ({tags}, exectTag)=>{
        if (tags.findIndex(i => i.value === exectTag)){
            let indexOfElement = tags.findIndex(i => i.value === exectTag)

            if (postTags.includes(tags[indexOfElement]) || postTags.length == 3){
                console.warn("Error of adding the tag!")
                return setPostTagsFilled("")
            }
            postTags.push(tags[indexOfElement])
            setPostTagsFilled("")

        } else {
            if (postTags.findIndex(i => i.value === exectTag) == 0 || postTags.length == 3){
                console.warn("Error of adding the tag!")
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
    }
    
    const bodyInput = useRef()
    return (
        <MainLayout title={"Create new post"}>
            <div className="wrapper">
                <div className="newPost__content">
                    <div className="newPost__content__header">
                        <h1>New article</h1>
                    </div>
                    <div className="newPost__content__main">
                        <div className="newPost__content__main__metaInpust">
                            <TextField value={postTitle} onChange={(e) => setPostTitle(e.target.value)} style={{width:"60%",margin:"10px 0px"}} className="metaInput" color={"secondary"} label="Title" />
                            <TextareaAutosize
                                style={{minHeight:"100px", minWidth:"100%", maxWidth:"100%", padding:"10px", fontFamily:"Roboto"}} 
                                aria-label="maximum height" 
                                placeholder="Description of your article"/>
                            <label htmlFor="upload" style={{cursor:"pointer", width:"24%",margin:"10px 0px"}} >
                                 <div style={{padding:"5px", borderRadius:"3px", display:"flex",justifyContent:"center",alignItems:"center", background:"black", color:"white"}}>
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
                                style={{overflow:"auto", minHeight:"400px", minWidth:"100%", maxWidth:"100%", padding:"10px", height:"150px", width:"50%", fontFamily:"Roboto"}} 
                                rowsMax={10} 
                                aria-label="maximum height" 
                                placeholder="Body of your article"/>
                        </div>
                    </div>
                    <div className="newPost__content__footer">
                        <div className="footer__tags " style={{margin:"0px 0 25px 0px", display:"flex", flexDirection:"row"}}>
                            <div className="footer__tags__item footer__tags__tagChoosing" style={{display:"flex", flexDirection:"column"}}>
                                <span style={{width:"100%", fontWeight:"500"}}>Choose not more than 3 suiteble tags</span>
                                <TextField onClick={setIsAutoCompleteOpenHandler} onChange={(e) => setPostTagsFilled(e.target.value)} value={postTagsFilled} style={{width:"53%", position:"relative"}} className="metaInput" color={"secondary"} label="suiteble tag" />
                                <ul style={{listStyle:"none", padding:"0", margin:"0", width:"53%"}} className="tag__autocomplete">
                                    {
                                        postTagsFilled && isAutoCompleteOpen ? filtredTags.map((tag) => { return<li onClick={ACItemClickHandler} className="tag__autocomplete__item" key={tag.id}>{tag.value}</li>}) : null
                                    }
                                </ul>
                            </div>
                            <div className="footer__tags__item footer__tags__suitebleTag">
                                <span style={{width:"100%", fontWeight:"500"}}>Tags: <span >{postTags.length !== 0 ?<span onClick={clearTags} className="clearTags" >clear</span>:null}</span></span>
                                <PostTags tagsList={postTags}/>
                            </div>
                        </div>
                        <button className="footer__tags__button">Next</button>
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
                    font-weight: 400;
                    opacity: 70%;
                    cursor:pointer;
                }
                .clearTags:hover, .clearTags:focus{
                    transition:.3s;
                    text-decoration:underline;
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
        props: {tags:tags}
    }
        
}