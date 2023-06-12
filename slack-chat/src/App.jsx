import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import ErrorPage from './Components/Error';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" />
      <Route path="*" element={<ErrorPage />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default App;
