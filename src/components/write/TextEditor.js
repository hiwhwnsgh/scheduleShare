import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // React Quill의 스타일시트
import { useSelector, useDispatch } from 'react-redux';
import { setContentInputValue } from '../../store/reducers';

const TextEditorForm = ({content,setContent}) => {
  const contentInputValue = useSelector((state) => state.input.contentInputValue);
  const dispatch = useDispatch();
  const handleInputChange = (html) => {
    dispatch(setContentInputValue(html)); // input 상태 업데이트
  };
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean'],
      ['blockquote'], // 추가한 모듈: 인용구
      ['code-block'], // 추가한 모듈: 코드 블록
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link',
    'blockquote', // 추가한 형식: 인용구
    'code-block', // 추가한 형식: 코드 블록
  ];

  return (
    <div>
      <ReactQuill
        value={contentInputValue}
        onChange={handleInputChange}
        modules={modules}
        formats={formats}
        style={{ height: '500px' }} // 에디터의 높이를 지정합니다.
      />
    </div>
  );
};

export default TextEditorForm;
