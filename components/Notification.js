import { withStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux'

const StyledAlert = withStyles({
    root: {
      justifyContent:"center",
    },
  })(Alert);

export const Notification = () =>{
    const alertProperties = useSelector(state => state.alerts)
    
    if(alertProperties.text !== ""){
        return(
            <>
                <StyledAlert severity = "warning">{alertProperties.text}</StyledAlert>

            </>
        )
    }else{
        return (
            <div></div>
        )
    }
}