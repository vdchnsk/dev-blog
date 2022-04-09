import { CurrentDate } from '../../../api/v1/services/general/CurrentDate'
import { ArticleRating } from './ArticleRating'

import styles from '../../../../styles/feeds/seconaryFeed/secondaryFeed.module.scss'

export const SecondaryFeed = () => {
    const currentMonth = new CurrentDate().getMounth()[1]

    return (
        <div className={styles.home__content__secondary}>
            <div className={styles.home__content__desk_tab}>
                <span className={styles.desk_tab__heading}>Лучшие статьи за {currentMonth} ✨</span>
                <hr style={{ border: ' 1px solid rgb(216 216 216)', margin: '10px' }} />
                <ArticleRating />
            </div>
            <div className={styles.home__content__creators}>
                <span className={styles.creatorsTab__heading}> Популярные криеэйторы 🙎‍♂️</span>
                <hr style={{ border: ' 1px solid rgb(216 216 216)' }} />
            </div>
        </div>
    )
}
