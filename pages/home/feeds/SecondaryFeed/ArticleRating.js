export const ArticleRating = () =>{
    //1) запрос на сервер, поиск всех статетй, месяц по дате которых равен месяцу, который сейчас
    //2) получаение рейтинга для каждой из статей:получаем кол-во просмотров, лайков, выдаем быллы по схеме (1просмотр = 0.5балла, 1 лайе = 1 балл)
    //3) сортируем с quicksort, возвращаем отсортированный массив
    //4) мапим массив в этом компоненте
    return (
        <div className="articleRating__content">
            <style jsx >{`
                .articleRating__content{
                    padding:0 13px;
                }
            `}
            </style>
        </div>
    )
}