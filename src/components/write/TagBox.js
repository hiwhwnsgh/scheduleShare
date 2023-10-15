import React, { useCallback, useState } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import { useDispatch, useSelector } from "react-redux";
import { addTag, removeTag } from "../../store/tagSlice";

const TagBoxBlock = styled.div`
    width: 100%;
    border-top: 1px solid ${palette.gray[2]};
    padding-top:2rem;
    
    label {
        color: ${palette.gray[8]};
        margin-top:0;
        margin-bottom:2.5rem;
    }
`
const TagForm = styled.form`
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    border: 1px solid ${palette.gray[9]};
    input,button{
        
        outline: none;
        border:none;
        font-size 1rem;
    }

    input {
        padding: 0.5rem;
        flex: 1;
        min-width: 0;
        
    }

    button {
        cursor: pointer;
        padding-right: 1rem;
        padding-left: 1rem;
        border: none;
        background: ${palette.gray[8]};
        color: white;
        font-weight: bold;
        &:hover{
            background: ${palette.gray[6]};
        }
    }
`;

const Tag = styled.div`
    margin-right: 0.5rem;
    color: ${palette.gray[6]};
    cursor: pointer;
    font-size: 12px;
    &:hover {
        opacity: 0.5;
    }
`
const TagListBlock = styled.div`
    display:flex;
    margin-top: 0.5rem;
`
const TagItem = React.memo(({tag, onRemove})=><Tag onClick={()=>onRemove(tag)}>#{tag}</Tag>)

const TagList = React.memo(({tags,onRemove})=>(
    <TagListBlock>
        {tags.map(tag=>(
            <TagItem key={tag} tag={tag} onRemove={onRemove}/>
        ))}
    </TagListBlock>
))

const TagBox = () => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const localTags = useSelector((state) => state.tags);
  
    const insertTag = useCallback(
      (tag) => {
        if (!tag) return;
        dispatch(addTag(tag)); // addTag 액션을 디스패치합니다.
      },
      [dispatch]
    );
  
    const onRemove = useCallback(
      (tag) => {
        dispatch(removeTag(tag)); // removeTag 액션을 디스패치합니다.
      },
      [dispatch]
    );
  
  
    const onChange = useCallback((e) => {
      setInput(e.target.value);
    }, []);
  
    const onSubmit = useCallback(
      (e) => {
        e.preventDefault();
        insertTag(input.trim());
        setInput("");
      },
      [input, insertTag]
    );
  
    return (
      <TagBoxBlock>
        <label htmlFor="tag">태그</label>
        <TagForm onSubmit={onSubmit}>
          <input
            placeholder="태그를 입력하세요"
            value={input}
            onChange={onChange}
            id="tag"
          />
          <button type="submit">추가</button>
        </TagForm>
        <TagList tags={localTags} onRemove={onRemove} />
        
      </TagBoxBlock>
    );
  };
  
  export default TagBox;