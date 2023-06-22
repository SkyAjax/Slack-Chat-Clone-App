import {
  BrowserRouter, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import Login from './Components/Login';
import ErrorPage from './Components/Error';
import MainPage from './Components/Main';
import AuthProvider from './Components/Auth';
// import useAuth from './hooks';

const PrivateRoute = ({ children }) => {
  // const auth = useAuth();
  const location = useLocation();
  const { token } = JSON.parse(localStorage.getItem('userId'));

  return (
    token ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          )}
        />
        <Route path="*" element={<ErrorPage />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
