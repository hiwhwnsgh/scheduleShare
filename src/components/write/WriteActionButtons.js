import styled from "styled-components";
import palette from "../../styles/palette";
import axios from "axios";
import { useSelector,useDispatch } from 'react-redux';
import { setContentInputValue, setTitleInputValue } from "../../store/reducers";
import { setEndDate, setStartDate } from "../../store/dateReducers";
import { clearTags } from "../../store/tagSlice";
import { Link } from "react-router-dom";
import useAuthEffect from "../../utils/auth";
import { URL_BackEnd } from "../../utils/constants";

const WriteActionButtonBlock = styled.div`
    display: flex;
    justify-content: flex-end;
    

    margin-bottom: 3rem;
    button + button {
        margin-left: 0.5rem;
    }
`

// TagBox에서 사용하는 버튼과일치하는 높이로 설정한 후 서로 간의여백 지정
const StyledButton = styled.button`
    border: solid 1px ${palette.gray[4]};
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color : white;
    outline: none;
    cursor: pointer;
    height: 2.125rem;
    margin-top: 5rem;
    & + & {
        margin-left: 0.5rem;
    }
    background: #227aee;
        &:hover{
            background: hsl(236, 88%, 59%);
        }
`


const WriteActionButtons =()=>{
    const contentInput = useSelector((state) => state.input.contentInputValue);
    const titleInput = useSelector((state) => state.input.titleInputValue);
    const startDate = useSelector((state)=> state.date.startDate);
    const endDate = useSelector((state)=>state.date.endDate);
    const tags = useSelector((state)=> state.tags);
    const userId = useSelector((state)=>state.user.loginId);
    const dispatch = useDispatch();

    useAuthEffect();

    const onClick = () =>{ 
        const currentdate = new Date();
        axios.post(`http://${URL_BackEnd}/postInsert`, { contentInput,titleInput,startDate,endDate,tags,currentdate,userId })
        .then(response => {
            // POST 요청이 성공한 경우 처리
        })
        .catch(error => {
            // 오류 처리
            console.error('데이터 전송 중 오류 발생:', error);
            
        }).finally(()=>{
            dispatch(clearTags()); // 태그 필드 초기화
            dispatch(setContentInputValue(''));
            dispatch(setTitleInputValue(''));
            dispatch(setStartDate(''));
            dispatch(setEndDate(''));
            dispatch(clearTags()); // 태그 필드 초기화
        });
    };
    return(
        <WriteActionButtonBlock>
            <Link to={'/community'}>
                <StyledButton style={{color:"black",background:"white"}}>
                    취소
                </StyledButton>
            </Link>
            <Link to={'/community'}>
                <StyledButton style={{border:'none'}} onClick={onClick}>
                    등록
                </StyledButton>
            </Link>
        </WriteActionButtonBlock>
    )
}

export default WriteActionButtons;