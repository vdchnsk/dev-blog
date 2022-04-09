import styles from 'styles/posts/post.module.scss'

export const PostTags = ({ tagsList }) => {
    return (
        <div className={styles.post__heading__stats__tags}>
            {tagsList.map((tag) => (
                <span
                    key={tag.id}
                    style={{
                        marginRight: '5px',
                        opacity: '75%',
                        fontWeight: '500',
                        borderRadius: '10px',
                        padding: '5px',
                        border: `2px solid ${tag.color}`,
                        color: `${tag.color}`,
                        cursor: 'pointer',
                    }}
                >
                    {' '}
                    {tag.value}{' '}
                </span>
            ))}
        </div>
    )
}
