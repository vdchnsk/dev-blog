import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {memo} from 'react'

const PostStats = ({liked, watched}) => {
    return (
        <div className="news__heading__stats">
            <span className="news__heading__stats__stat news__heading__stats__likes"><FavoriteBorderIcon style={{color: "#ff00e0",marginRight:"4px"}}/>{liked}</span>
            <span className="news__heading__stats__stat news__heading__stats__watched"><VisibilityIcon style={{color: "#4780e6", marginRight:"4px"}} />{watched}</span>
            <style jsx >{`
                .news__heading__stats{
                    align-items: center;
                    display:flex;
                }
                .news__heading__stats__likes{
                    cursor:pointer;
                }
                .news__heading__stats__stat{
                    display:flex;
                    margin: 10px 20px 0 0;
                }
            `}
            </style>
        </div>
    )
}
export default memo(PostStats)