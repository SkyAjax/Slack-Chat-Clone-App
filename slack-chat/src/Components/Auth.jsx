import { useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const token = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(!!token);
  const [username, setUsername] = useState(token ? token.username : '');
  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    console.log(data);
    setUsername(data.username);
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const values = useMemo(() => (
    {
      loggedIn,
      logIn,
      logOut,
      username,
      setUsername,
    }), [loggedIn, username]);

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
