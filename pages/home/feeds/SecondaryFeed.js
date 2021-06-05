import { CurrentDate } from "../../api/classes/general/CurrentDate"

export const SecondaryFeed = () =>{
    const month = new CurrentDate().getMounth() //метод возвращает массив, где 0 - числовое знчение месяца, 1 - буквенное
    return(
        <div className="home__content__secondary">
            <div className="home__content__desk">
            <span style={{color:"#525252", margin:"0", textAlign:"center", display:"block", marginLeft:"auto ", marginRight:"auto", fontWeight:"600", padding:"10px"}}>Лучшие статьи за {month[1]} ✨</span>
            <hr style={{border:" 1px solid rgb(216 216 216)", margin:"10px"}}/>
            </div>
            <div className="home__content__creators">
            <span style={{color:"#525252", margin:"0", textAlign:"center", display:"block", marginLeft:"auto ", marginRight:"auto", fontWeight:"600", padding:"10px"}}>Популярные криеэйторы 🙎‍♂️</span>
            <hr style={{border:" 1px solid rgb(216 216 216)", margin:"10px"}}/>
            </div>
            <style jsx >{`
            .home__content__secondary{
                padding:10px;
                width:20%;
                height:700px;
                display: flex;
                flex-direction: column;
            }
            .home__content__desk{
                border-radius: 10px;
                height:60%;
                background-color:#F7F7F7;
                margin-bottom:10px;
            }
            .home__content__creators{
                border-radius: 10px;
                height:40%;
                background-color:#F7F7F7;
            }
            `}
            </style>
      </div>
    )
}