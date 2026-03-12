import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { User, Zap } from 'lucide-react';
import './App.css'; // Весь дизайн теперь здесь

import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Booking from './pages/Booking';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Zap size={24} color="var(--accent)" fill="var(--accent)" />
            <span style={{ fontWeight: '900', letterSpacing: '3px' }}>DARK_CLEAN</span>
          </Link>
          
          <nav style={{ display: 'flex', gap: '40px' }}>
            <Link to="/services" className="nav-link">УСЛУГИ</Link>
            <Link to="/booking" className="nav-link">ЗАПИСЬ</Link>
            <Link to="/profile" className="nav-link"><User size={20}/></Link>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <footer className="container" style={{ padding: '60px 0', textAlign: 'center', opacity: 0.3 }}>
        <p>© 2026 PREMIUM_CLEAN_DETAILING</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;