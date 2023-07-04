import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import ImagesPage from './pages/ImagesPage';
import ImagesAnnotationPage from './pages/ImagesAnnotationPage';
import Nopage from './pages/Nopage';

function App() {
  return (
    <div className="body">
 
    <Header className="header"/>
  
    <Router className="main">
      <nav className="nav-container">
        <div className="nav-links">
          <Link to="/images/upload" className="nav-link">Upload Image</Link>
          <Link to="/images/view" className="nav-link">View All Images</Link>
          <Link to="/images/edit/:id" className="nav-link">Annotate Image</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/images/upload" element={<UploadPage />} />
        <Route path="/images/view" element={<ImagesPage />} />
        <Route path="/images/edit/:id" element={<ImagesAnnotationPage />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </Router>
    
   
      <Footer className="footer" />
    
    </div>
  );
}

export default App;


