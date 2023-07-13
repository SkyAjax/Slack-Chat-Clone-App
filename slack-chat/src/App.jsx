import {
  BrowserRouter, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login';
import ErrorPage from './Components/Error';
import MainPage from './Components/Main';
import AuthProvider from './Components/Auth';
import Navbar from './Components/Navbar';
import Modal from './Components/Modals/Modal';
import Signup from './Components/Signup';

const PrivateRoute = ({ children }) => {
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
        <ToastContainer />
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
          <Route path="signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
