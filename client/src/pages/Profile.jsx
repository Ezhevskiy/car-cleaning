import React from 'react';
import { User, Clock } from 'lucide-react';

const Profile = () => {
  return (
    <div className="container profile-section">
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="user-info">
            <div className="user-avatar">
              <User size={40} />
            </div>
            <h3>Константин В.</h3>
            <p>Клиент с 2024 года</p>
          </div>
          
          <nav className="profile-nav">
            <div className="profile-nav-item active">Активные записи</div>
            <div className="profile-nav-item">История услуг</div>
            <div className="profile-nav-item">Настройки</div>
          </nav>
        </aside>

        <section className="profile-content">
          <h2 className="section-title">ВАШИ ЗАКАЗЫ</h2>
          <div className="card-premium active-order">
            <div className="order-info">
              <span className="order-badge">СТАТУС: В РАБОТЕ</span>
              <h3>Ceramic Shield — BMW M5</h3>
              <p>Мастер: Алексей С.</p>
            </div>
            <div className="order-meta">
              <div className="order-time">
                <Clock size={18} /> 14.03 / 10:00
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;