// src/main/frontend/src/App.js

import React, {useState} from 'react';

import Categories from './components/common/Categories';
import { useCallback } from 'react';
import PostPage from './pages/PostPage';
import { Route, Routes } from 'react-router-dom';
import WritePost from './pages/WritePostPage';
import SchedulePage from './pages/SchedulePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostViewPage from './pages/PostViewPage';
import InfoPage from './pages/InfoPage';
import ChatPage from './pages/ChatPage';


const App = () => {
    const [category,setCategory] = useState('/community');
    const onSelect = useCallback((category)=>{
            setCategory(category)
        }
    ,[]);

    

    return (
        <div style={{background:'#525252',height:'100vh',display:'flex',justifyContent:'center'}}>
            <div style={{background:'#fff',height:'100vh',width:'65%'}}>
            <Routes>
                <Route element={<Categories category={category} onSelect={onSelect}/>}>
                    <Route path='/' element={<PostPage/>}></Route>
                    <Route path='/:category' element={<PostPage/>}/>
                    <Route path='/community/:page' element={<PostPage/>}/>
                    <Route path='/writepost' element={<WritePost/>}/>
                    <Route path='/schedule/:loginId' element={<SchedulePage/>}/>
                    <Route path='/info/:loginId' element={<InfoPage/>}/>
                    <Route path="/post/:id" element={<PostViewPage/>}/>
                    <Route path="/chat/" element={<ChatPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/register' element={<RegisterPage/>}/>
                </Route>
                
            </Routes>
            </div>
            
        </div>

    );
}

export default App;