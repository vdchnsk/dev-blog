import { useEffect, useRef, useState } from "react";
import { TextareaAutosize, TextField } from "@material-ui/core";
import { MainLayout } from "../../components/MainLayout";
import PublishIcon from '@material-ui/icons/Publish';



export default function CreatePost({}){
    const [postTitle, setPostTitle] = useState("")
    const [postDescription, setPostDescription] = useState("")
    const [postBody, setPostBody] = useState("")
    const [postPreview, setPostPreview] = useState("Articel Body")
    const [postTags, setPostTags] = useState([])

    const modifyText =  tag => {
        setPostBody(postBody + tag)
        bodyInput.current.focus()
    }
    useEffect(() => {

    }, [postPreview])
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
                                 <div style={{padding:"5px", borderRadius:"3px", display:"flex",justifyContent:"center",alignItems:"center", background:"black", color:"white", position:"relative"}}>
                                    <input onChange={(e) => setPostPreview(e.target.value)} id="upload" style={{cursor:"pointer", height:"100%", width:"100%", opacity:"0",zIndex:"10", position:"absolute"}} type="file" hidden/>
                                    <PublishIcon/>
                                    <span style={{marginLeft:"1px",whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"} }>{postPreview}</span>
                                </div>
                            </label>
                        </div>
                        <div className="newPost__content__main__aricleInput">
                            <div className="newPost__content__main__aricleInput__toolbar">
                                <button onClick={()=>{modifyText("<strong></strong>")}} className="toolbar__element"><strong>bold</strong></button>
                                <button onClick={()=>{modifyText("<i></i>")}} className="toolbar__element"><i>italic</i></button>
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
                                placeholder="Write down your comment!"/>
                        </div>
                    </div>
                    <div className="newPost__content__footer">
                        <div className="footer__tags">
                            <span>Choose not more than 3 suiteble tags</span>
                            <TextField style={{width:"60%",margin:"10px 0 25px 0px"}} className="metaInput" color={"secondary"} label="suiteble tag" />
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