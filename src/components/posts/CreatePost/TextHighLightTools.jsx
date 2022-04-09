import styles from '@styles/create_post_page/create_post_page.module.scss'

export const TextHighLightTools = ({ heightElements = [], modifyTextMethod = () => {} }) => {
    const getTagFromItemTitle = (item) => {
        if (item == '•') {
            return item
        }
        if (item == 'image') {
            return '<img><img/>'
        }
        return `<${item}></${item}>`
    }

    return (
        <div className={styles.newPost__content__main__aricleInput__toolbar}>
            {heightElements.map((element) => (
                <button
                    onClick={() => {
                        modifyTextMethod(getTagFromItemTitle(element))
                    }}
                    className={styles.toolbar__element}
                >
                    <span>{element}</span>
                </button>
            ))}
        </div>
    )
}
