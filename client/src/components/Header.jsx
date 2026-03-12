import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Проверяем авторизацию

  const handleLogout = () => {
    localStorage.removeItem('user'); // Удаляем данные
    navigate('/login');
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <Link strokeWidth={2} to="/" className="logo">CAR WASH</Link>
        
        <div className="nav-links">
          <Link to="/services">Услуги</Link>
          
          {user ? (
            <>
              <Link to="/profile" className="user-name">Личный кабинет ({user.full_name})</Link>
              <button onClick={handleLogout} className="logout-btn">Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login">Вход</Link>
              <Link to="/register" className="register-btn">Регистрация</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;