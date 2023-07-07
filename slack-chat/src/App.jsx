import {
  BrowserRouter, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import Login from './Components/Login';
import ErrorPage from './Components/Error';
import MainPage from './Components/Main';
import AuthProvider from './Components/Auth';
import Navbar from './Components/Navbar';
import Modal from './Components/Modals/Modal';
// import useAuth from './hooks';

const PrivateRoute = ({ children }) => {
  // const auth = useAuth();
  const location = useLocation();
  const userId = localStorage.getItem('userId');
  return (
    userId ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Modal />
        <Navbar />
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
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
