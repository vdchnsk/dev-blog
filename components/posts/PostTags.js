export const PostTags = ({tagsList}) => {
    return (
        <div className="news__heading__stats__tags">
            {tagsList.map(tag =>(
                <span key={tag.id} style={{marginRight:"5px", opacity:"75%", fontWeight:"500", borderRadius:"10px",padding:"5px", border: `2px solid ${tag.color}`, color:`${tag.color}`, cursor:"pointer"}}> {tag.value} </span>
            ))}
            <style jsx >{`
                .news__heading__stats__tags{
                    margin:2% 0 2% 0;
                    display:flex;
                }
            `}
            </style>
        </div>
    )
}
