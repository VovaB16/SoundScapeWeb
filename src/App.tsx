import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Artist from './components/Views/Artist';
import Header from './components/Commons/Header/index';
import Footer from './components/Commons/Footers/index';
import RegisterStep2 from './components/Commons/Auth/Register/RegisterStep2';
import RegisterStep3 from './components/Commons/Auth/Register/RegisterStep3';
import RegisterStep1 from './components/Commons/Auth/Register/RegisterStep1';
import { RegistrationProvider } from './components/Commons/Auth/Register/RegistrationContext';
import Main from './components/Views/main';
import Login from './components/Commons/Auth/Login/Login';

const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/register-step1' || location.pathname === '/register-step2' || location.pathname === '/register-step3' || location.pathname === '/login';

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <div className={`flex flex-col min-h-screen bg-black text-white ${hideHeaderFooter ? '' : 'mt-[242px]'}`}>
        <div className="flex-grow">
          <Routes>
          <Route path="/main" element={<Main />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/artist/:id" element={<Artist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register-step1" element={<RegisterStep1 />} />
            <Route path="/register-step2" element={<RegisterStep2 />} />
            <Route path="/register-step3" element={<RegisterStep3 />} />
          </Routes>
        </div>
        {!hideHeaderFooter && <Footer />}
      </div>
    </>
  );
};

const App = () => {
  return (
    <RegistrationProvider>
      <Router>
        <AppContent />
      </Router>
    </RegistrationProvider>
  );
};

export default App;