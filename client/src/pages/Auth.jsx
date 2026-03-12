import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ full_name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const action = isLogin ? 'login' : 'register';
    try {
      const response = await fetch(`http://localhost/car/api/index.php?action=${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem('user', JSON.stringify(result.user));
          onLogin(); // Обновляем состояние в App.jsx
          navigate('/profile');
        } else {
          alert('Регистрация успешна! Теперь войдите.');
          setIsLogin(true);
        }
      } else {
        setError(result.error || 'Ошибка доступа');
      }
    } catch (err) {
      setError('Сервер XAMPP не отвечает');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="accent-text">{isLogin ? 'ВХОД' : 'РЕГИСТРАЦИЯ'}</h2>
        {error && <p className="error-msg">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input type="text" placeholder="ФИО" className="auth-input" 
                onChange={e => setFormData({...formData, full_name: e.target.value})} required />
              <input type="text" placeholder="ТЕЛЕФОН" className="auth-input" 
                onChange={e => setFormData({...formData, phone: e.target.value})} />
            </>
          )}
          <input type="email" placeholder="EMAIL" className="auth-input" 
            onChange={e => setFormData({...formData, email: e.target.value})} required />
          <input type="password" placeholder="ПАРОЛЬ" className="auth-input" 
            onChange={e => setFormData({...formData, password: e.target.value})} required />
          
          <button type="submit" className="btn-primary" style={{width: '100%', marginTop: '10px'}}>
            {isLogin ? 'ВОЙТИ' : 'СОЗДАТЬ АККАУНТ'}
          </button>
        </form>

        <p onClick={() => setIsLogin(!isLogin)} style={{cursor: 'pointer', marginTop: '20px', fontSize: '0.8rem', opacity: 0.7}}>
          {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
        </p>
      </div>
    </div>
  );
};

export default Auth;