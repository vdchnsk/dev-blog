import { CurrentDate } from '../../../api/services/general/CurrentDate'
import { ArticleRating } from './ArticleRating'

export const SecondaryFeed = () => {
    const month = new CurrentDate().getMounth() //метод возвращает массив, где 0 - числовое знчение месяца, 1 - буквенное
    return (
        <div className="home__content__secondary">
            <div className="home__content__desk">
                <span
                    style={{
                        color: '#525252',
                        margin: '0',
                        textAlign: 'center',
                        display: 'block',
                        marginLeft: 'auto ',
                        marginRight: 'auto',
                        fontWeight: '600',
                        paddingBottom: '10px',
                    }}
                >
                    Лучшие статьи за {month[1]} ✨
                </span>
                <hr style={{ border: ' 1px solid rgb(216 216 216)', margin: '10px' }} />
                <ArticleRating />
            </div>
            <div className="home__content__creators">
                <span
                    style={{
                        color: '#525252',
                        margin: '0',
                        textAlign: 'center',
                        display: 'block',
                        marginLeft: 'auto ',
                        marginRight: 'auto',
                        fontWeight: '600',
                        padding: '10px',
                    }}
                >
                    Популярные криеэйторы 🙎‍♂️
                </span>
                <hr style={{ border: ' 1px solid rgb(216 216 216)' }} />
            </div>
            <style jsx>
                {`
                    .home__content__secondary {
                        padding: 10px;
                        width: 20%;
                        height: 700px;
                        display: flex;
                        flex-direction: column;
                    }
                    .home__content__desk {
                        padding: 13px;
                        border-radius: 10px;
                        height: 60%;
                        background-color: #f7f7f7;
                        margin-bottom: 10px;
                    }
                    .home__content__creators {
                        padding: 13px;
                        border-radius: 10px;
                        height: 40%;
                        background-color: #f7f7f7;
                    }
                `}
            </style>
        </div>
    )
}
