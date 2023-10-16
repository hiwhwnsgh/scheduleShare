// auth.js

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../store/userSlice';
import { login } from '../store/authSlice';

function useAuthEffect() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('authToken') !== null) {
      axios.get('/info', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      .then(response => {
        dispatch(setUser(response.data));
        dispatch(login(localStorage.getItem('authToken')));
      })
      .catch(error => {
        console.log(error);
      });
    }
  }, [dispatch]);
}

export default useAuthEffect;
