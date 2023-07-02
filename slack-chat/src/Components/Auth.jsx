import axios from 'axios';
import { useMemo, useState, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import getAuthHeader from '../helpers';
import routes from '../routes';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [channelId, setChannelId] = useState(1);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const request = getAuthHeader();
      const response = await axios.get(routes.usersPath(), { headers: request });
      const { data } = response;
      const { currentChannelId } = data;
      const token = JSON.parse(localStorage.getItem('userId'));
      setUsername(token.username);
      setChannelId(currentChannelId);
      logIn();
    };
    fetchData();
  }, []);

  const values = useMemo(() => (
    {
      loggedIn,
      logIn,
      logOut,
      username,
      setUsername,
      channelId,
      setChannelId,
    }), [loggedIn, channelId, username]);

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
