import { CircularProgress } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import styles from '@styles/loader.module.scss'

export const Loader = () => {
    return (
        <div className={styles.laoder__content}>
            <CircularProgress color={'secondary'} />
        </div>
    )
}
