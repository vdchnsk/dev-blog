import { withStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux'
import { hideAlert } from '../pages/redux/actions/alertActions';


const StyledAlert = withStyles({
    root: {
      justifyContent:"center",
      animation: '$fade .4s'
    },
    "@keyframes fade":{
        '0%': { opacity: '0%' }, 
        '100%': { opacity: '100%' },
    }
  })(Alert);
  export const Notification = () =>{
    const dispatch = useDispatch()  
    const alertProperties = useSelector(state => state.alerts)
    
    if(alertProperties.text !== ""){
        return(
            <>
                <StyledAlert style={{ position:"fixed", top:"0", right:"0", margin:"85px 19px 0px 0px"}} onClose={() => {dispatch(hideAlert())}} severity={`${alertProperties.type}`} >{alertProperties.text}</StyledAlert>
            </>
        )
    }else{
        return (
            <div></div>
        )
    }
}