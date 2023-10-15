import styled from 'styled-components';
import Tags from '../common/Tags';
import SubInfo from '../common/SubInfo';
import { Link } from 'react-router-dom';
import '../../styles/PostList.scss'


const StyledLink = styled(Link)`
    color: inherit; /* 링크 텍스트 색을 상위 요소에서 상속합니다. */
    text-decoration: none; /* 텍스트 밑줄 제거 */
`
const PostList = ({postList}) => {
    
    return(
        <div style={{width:'65%'}}>
            {
                postList.map(post=>
                    <StyledLink to={`/post/${post.id}`} key={post.id}>
                        <div>
                            <div className='listItem' >
                                <h4>{post.title}</h4>
                                <SubInfo username={post.nickname} publishedDate={post.registrationDate}/>    
                                <Tags tags={post.tags}></Tags>
                            </div>   
                            <hr/>
                        </div>
                    </StyledLink>
                )
            }
        </div>
    )
}

export default PostList;