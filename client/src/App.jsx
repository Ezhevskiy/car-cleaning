import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { User, Zap, LogIn } from 'lucide-react';
import './App.css';

// Импорт компонентов страниц
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import Auth from './pages/Auth';

function App() {
  // Инициализируем состояние сразу из localStorage, чтобы избежать редиректа при F5
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Функция для обновления состояния (вызывается из Auth и Profile)
  const refreshUser = () => {
    const savedUser = localStorage.getItem('user');
    setUser(savedUser ? JSON.parse(savedUser) : null);
  };

  return (
    <BrowserRouter>
      <header className="header">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Zap size={24} color="var(--accent)" fill="var(--accent)" />
            <span style={{ fontWeight: '900', letterSpacing: '3px' }}>DARK_CLEAN</span>
          </Link>
          
          <nav style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            <Link to="/services" className="nav-link">УСЛУГИ</Link>
            <Link to="/booking" className="nav-link">ЗАПИСЬ</Link>
            
            {user ? (
              <Link to="/profile" className="nav-link" title="Личный кабинет">
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #222', padding: '5px 12px', borderRadius: '4px'}}>
                   <span style={{fontSize: '0.7rem', textTransform: 'uppercase'}}>{user.full_name.split(' ')[0]}</span>
                   <User size={18} color="var(--accent)"/>
                </div>
              </Link>
            ) : (
              <Link to="/auth" className="nav-link" title="Войти">
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <span style={{fontSize: '0.7rem'}}>ВОЙТИ</span>
                  <LogIn size={18}/>
                </div>
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/auth" element={<Auth onLogin={refreshUser} />} />
          
          {/* Защищенные роуты */}
          <Route 
            path="/booking" 
            element={user ? <Booking /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile onLogout={refreshUser} /> : <Navigate to="/auth" />} 
          />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <footer className="container" style={{ padding: '60px 0', textAlign: 'center', opacity: 0.2, fontSize: '0.8rem' }}>
        <p>© 2026 PREMIUM_CLEAN_DETAILING | РУБЛИ (₽)</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;