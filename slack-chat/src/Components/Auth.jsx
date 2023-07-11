import { useMemo, useState, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = JSON.parse(localStorage.getItem('userId'));
      if (token) {
        setUsername(token.username);
        return logIn();
      }
      return logOut();
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
    }), [loggedIn, username]);

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
