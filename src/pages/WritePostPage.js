import React from 'react';
import styled from "styled-components";
import TagBox from "../components/write/TagBox";
import TextEditorForm from "../components/write/TextEditor";
import WriteActionButtons from "../components/write/WriteActionButtons";
import palette from "../styles/palette";
import { useSelector, useDispatch } from 'react-redux';
import {setTitleInputValue } from '../store/reducers';
import {setStartDate,setEndDate } from '../store/dateReducers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdDomainVerification } from "react-icons/md";




const StyledLabel = styled.label`
    margin-top : 2.5rem;
    margin-bottom: 3px;
`

const StyledInput = styled.input`
    border-radius: 4px;
    outline: none;
    overflow: hidden;
    display: flex;
    border: 1px solid ${palette.gray[9]};
    font-size: 12px;
    padding: 0.5rem;
    flex: 1;
    min-width: 0;
`
const StyledDiv = styled.div`
    display: flex;
    justify-content : center;
    
    align-items: center;
    margin:2rem;
`;


const CustomDatePicker = styled(DatePicker)`
    padding:0.5rem;
    outline: none;
    width:11.5rem;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid ${palette.gray[9]};
    font-size: 14px;
    text-align: center;
`;

const WritePostPage = () =>{
    const titleinput = useSelector((state) => state.input.titleInputValue); // titleinput 상태 추가
    const startDate = useSelector((state)=>state.date.startDate);
    const endDate = useSelector((state)=> state.date.endDate);
    const dispatch = useDispatch();
    
    const handleStartDateChange = (date) => {
        dispatch(setStartDate(date));
      };
    
      const handleEndDateChange = (date) => {
        dispatch(setEndDate(date));
      };
    
    
    const handleTitleInputChange = (e) => {
        const newTitleValue = e.target.value;
        dispatch(setTitleInputValue(newTitleValue)); // titleinput 상태 업데이트
      };
    
    return(

        <div style={{display:"flex",justifyContent:"center",}}>
            <div style={{display:"flex",flexDirection:"column",width:"45%"}}>
                <StyledLabel htmlFor="title">제목</StyledLabel>
                
                <StyledInput type="text" id="title"  value={titleinput} onChange={handleTitleInputChange} placeholder="제목을 입력해주세요."></StyledInput>
                <StyledDiv>
                
                <div>
                    <MdDomainVerification style={{ fontSize: "25px" }} />
                    <CustomDatePicker selected={startDate} onChange={handleStartDateChange} placeholderText="시작일" />
                    </div>
                    <div>
                    <MdDomainVerification style={{ fontSize: "25px" }} />
                    <CustomDatePicker selected={endDate} onChange={handleEndDateChange} placeholderText="종료일" />
                </div>

                </StyledDiv>
                <TagBox/>
                <StyledLabel>본문</StyledLabel>
                <TextEditorForm></TextEditorForm>
                
                <WriteActionButtons></WriteActionButtons>
            </div>
        </div>
    )
}
export default WritePostPage;