import { memo } from 'react'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import VisibilityIcon from '@material-ui/icons/Visibility'

import styles from 'styles/posts/post.module.scss'

const PostStats = ({ liked, watched }) => {
    return (
        <div className={styles.post__heading__stats}>
            <span className={`${styles.stats__sinngle_stat} ${styles.stats__likes}`}>
                <FavoriteBorderIcon style={{ color: '#ff00e0', marginRight: '4px' }} />
                {liked}
            </span>
            <span className={`${styles.stats__sinngle_stat} ${styles.stats__watched}`}>
                <VisibilityIcon style={{ color: '#4780e6', marginRight: '4px' }} />
                {watched}
            </span>
        </div>
    )
}
export default memo(PostStats)
