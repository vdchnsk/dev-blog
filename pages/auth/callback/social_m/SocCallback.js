import { MainLayout } from "../../../../components/MainLayout";
import { showAlert } from "../../../redux/actions/alertActions";
import { Notification } from "../../../../components/Notification";
import {providers, getSession, useSession} from "next-auth/client"
import Image from "next/image";
import { useEffect } from "react";
import generator from "generate-password"
import Button from '@material-ui/core/Button';
import { useRouter } from "next/router";

export default function SocCallback ({session, generated_password}) {
    const userData = session.user

    return(
        <MainLayout title={"Log in"}>
            <Notification/>
            <div style={{height:"80vh", display:"flex", justifyContent:"center", alignItems:"center"}} className="wrapper">
                <div style={{backgroundColor:"#F5F5F5", display:"flex", flexDirection:"column", textAlign:"center", padding:"2%", borderRadius:"15px"}} className="callback_window">
                    <div style={{display:"flex", flexDirection:"column"}} className="callback_window__header">
                        <h2 >Congratulations! 🎉</h2><span>You've signed in as <strong>{userData.name}</strong></span>
                        <img style={{borderRadius:"50%", maxWidth:"100px", margin:"auto"}} src={`${userData.image}`}/>
                    </div>
                    <div className="callback_window__body">
                        <div style={{display:"flex", flexDirection:"column"}} className="callback_window__body_profileInfo">
                            <span className="callback_window__body_profileInfo-item" >Your email: <strong>{userData.email}</strong></span>
                            <span className="callback_window__body_profileInfo-item" >Your password: <strong>{generated_password}</strong></span>
                            <span className="callback_window__body_profileInfo-item" >You're able to change everything in your profile settings page</span>
                        </div> 
                    </div>
                    <div className="callback_window__footer">
                        <Button 
                            // disabled={inProcess} 
                            // onClick={loginSubmit} 
                            variant="contained" size="medium" 
                            style={{color:"white", background:"black", margin:"10px"}}
                            >Confirm
                        </Button>
                    </div>
                </div>
            </div>
            <style jsx >{`
                span{
                    padding:7px;
                    opacity:90%;
                }
            `}
            </style>
        </MainLayout>
    )
}

SocCallback.getInitialProps = async(context) => {
    const {req,res} = context
    const session = await (getSession({req}))
        const generated_password = generator.generate({length: 12, numbers: true});
    return {
        session:session, 
        generated_password:generated_password
    }

}