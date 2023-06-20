import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import useAuth from '../hooks';

const MainPage = () => {
  const navigate = useNavigate();
  //   const auth = useAuth();
  const { token } = JSON.parse(localStorage.getItem('userId'));
  useEffect(() => (!token ? navigate('login') : null));

  return (
    <h1>Hey man!</h1>
  );
};

export default MainPage;
