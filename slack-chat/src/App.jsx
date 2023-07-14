// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider, ErrorBoundary } from '@rollbar/react';
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

const rollbarConfig = {
  accessToken: 'c247067b69fe4c52a983a7f7a67689ef',
  environment: 'testenv',
};

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter basename="/">
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
    </ErrorBoundary>
  </Provider>
);

export default App;
