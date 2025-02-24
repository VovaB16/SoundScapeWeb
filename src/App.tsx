import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Commons/Header/index.tsx';
import Footer from './components/Commons/Footers/index.tsx';
import Artist from './components/Views/Artist.tsx';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="mt-[242px] flex flex-col min-h-screen bg-black text-white">
        <div className="flex-grow">
          <Routes>
            <Route path="/artist" element={<Artist />} />
            <Route path="/artist/:id" element={<Artist />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};


export default App;