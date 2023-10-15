import styled from "styled-components";

const TagsBlock = styled.div`
    margin-top: 0;
    .tag{
        display: inline-block;
        color: #1098ad;
        text-decoration: none;
        margin-right: 0.5rem;
        &:hover {
            color: #15aabf;
        }
    }
`;

const Tags = ({tags})=>{
    return(
        <TagsBlock>
            {tags.map(tag=>(
                <div className="tag" key={tag.id}>
                    #{tag.name}
                </div>
                ))}
        </TagsBlock>
    )
}

export default Tags;