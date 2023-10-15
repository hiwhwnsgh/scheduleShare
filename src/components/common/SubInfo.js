import styled from "styled-components";
import palette from "../../styles/palette";
const SubInfoBlock = styled.div`
    margin-top : 0.5rem;
    color: ${palette.gray[6]};
    
    span + span:before {
        color: ${palette.gray[4]};
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7';
    }
`;

const SubInfo = ({username, publishedDate}) => {
    return(
        <SubInfoBlock>
            <span>
                <b>
                    {username}
                </b>
            </span>
            <span>{new Date(publishedDate).toLocaleDateString()}</span>
        </SubInfoBlock>
    )
}

export default SubInfo;