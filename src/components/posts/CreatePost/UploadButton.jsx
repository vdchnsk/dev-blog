import PublishIcon from '@material-ui/icons/Publish'
import styles from 'styles/create_post_page/create_post_page.module.scss'

export const UploadButton = ({ onChange, text }) => (
    <label htmlFor="upload" style={{ cursor: 'pointer', width: '24%', margin: '10px 0px' }}>
        <div tabIndex="0" className={styles.uploadFileButton}>
            <input
                onChange={onChange}
                id="upload"
                style={{
                    cursor: 'pointer',
                    height: '100%',
                    width: '100%',
                    opacity: '0',
                    zIndex: '10',
                    position: 'absolute',
                }}
                type="file"
                hidden
            />
            <PublishIcon />
            <span>{text !== '' ? text : 'Post preview'}</span>
        </div>
    </label>
)
