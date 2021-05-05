import { TextareaAutosize, TextField } from "@material-ui/core";
import { MainLayout } from "../../components/MainLayout";



export default function CreatePost({}){

    return (
        <MainLayout title={"Create new post"}>
            <div className="wrapper">
                <div className="newPost__content">
                    <div className="newPost__content__header">
                        <h1>New article</h1>
                    </div>
                    <div className="newPost__content__main">
                        <div className="newPost__content__main__metaInpust">
                            <TextField style={{width:"60%",margin:"10px 0px"}} className="metaInput" color={"secondary"} label="Title" />
                            <TextareaAutosize
                                style={{minHeight:"100px", minWidth:"100%", maxWidth:"100%", padding:"10px", fontFamily:"Roboto"}} 
                                aria-label="maximum height" 
                                placeholder="Description of your article"/>
                            <span style={{width:"60%",margin:"10px 0px"}} >Article Preview <input type="file"/></span>
                        </div>
                        <div className="newPost__content__main__aricleInput">
                            <div className="newPost__content__main__aricleInput__toolbar">
                                <button className="toolbar__element"><strong>bold</strong></button>
                                <button className="toolbar__element"><i>italic</i></button>
                                <button className="toolbar__element">list</button>
                                <button className="toolbar__element" style={{borderRight:"2px solid black"}}>image</button>
                            </div>
                            <TextareaAutosize
                                style={{minHeight:"400px", minWidth:"100%", maxWidth:"100%", padding:"10px", height:"150px", width:"50%", fontFamily:"Roboto"}} 
                                rowsMax={10} 
                                aria-label="maximum height" 
                                placeholder="Write down your comment!"/>
                        </div>
                    </div>
                    <div className="newPost__content__footer">
                        <div className="footer__tags">
                            <span>Choose not more than 3 suiteble tags</span>
                            <TextField style={{width:"60%",margin:"10px 0px"}} className="metaInput" color={"secondary"} label="suiteble tag" />
                        </div>
                        <button className="footer__tags__button">Create</button>
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
                .toolbar__element:hover{
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
                .footer__tags__button:focus{
                    background:black;
                    color:white;
                }
                .footer__tags__button:hover{
                    background:black;
                    color:white;
                }
            `}
            </style>
        </MainLayout>
    )
}