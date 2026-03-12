import React, { useEffect, useState } from 'react';

const Profile = ({ onLogout }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Безопасное получение данных пользователя
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    // Добавляем user.id в зависимости, чтобы избежать лишних запросов или ошибок
    if (user && user.id) {
      fetch(`http://localhost/car/api/index.php?action=get_user_bookings&user_id=${user.id}`)
        .then(res => res.json())
        .then(data => {
          // Если сервер вернул ошибку в JSON, ставим пустой массив
          setBookings(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(err => {
          console.error("Ошибка при получении бронирований:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user.id]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    onLogout();
  };

  return (
    <div className="container" style={{ padding: '60px 0', color: '#fff' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '1px solid #222', 
        paddingBottom: '30px' 
      }}>
        <div>
          <h2 className="accent-text" style={{ margin: 0, textTransform: 'uppercase' }}>Личный кабинет</h2>
          <p style={{ color: '#888', marginTop: '5px' }}>{user.full_name} | {user.email}</p>
        </div>
        <button 
          onClick={handleLogout} 
          className="btn-primary" 
          style={{ background: '#ff4444', border: 'none', cursor: 'pointer' }}
        >
          ВЫЙТИ
        </button>
      </div>

      <h3 style={{ marginTop: '50px', letterSpacing: '2px', fontSize: '0.9rem', color: '#555' }}>
        ИСТОРИЯ БРОНИРОВАНИЙ
      </h3>
      
      {loading ? (
        <p style={{ color: 'var(--accent)' }}>Загрузка данных...</p>
      ) : bookings.length > 0 ? (
        <table style={{ width: '100%', marginTop: '30px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ 
              borderBottom: '1px solid #333', 
              textAlign: 'left', 
              color: 'var(--accent)', 
              fontSize: '0.7rem' 
            }}>
              <th style={{ padding: '15px' }}>УСЛУГА</th>
              <th>АВТОМОБИЛЬ</th>
              <th>ДАТА И ВРЕМЯ</th>
              <th style={{ textAlign: 'right' }}>СТАТУС</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id} style={{ borderBottom: '1px solid #111' }}>
                <td style={{ padding: '15px', fontSize: '0.9rem' }}>{b.service_name || 'Услуга'}</td>
                <td style={{ color: '#ccc', fontSize: '0.9rem' }}>{b.car_model}</td>
                <td style={{ color: '#888', fontSize: '0.85rem' }}>
                  {b.booking_date} <span style={{ color: '#444' }}>в</span> {b.booking_time}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <span style={{ 
                    color: b.status === 'pending' ? '#ffaa00' : 'var(--accent)', 
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {(() => {
                      switch(b.status?.toLowerCase()) {
                        case 'pending': return 'В ОБРАБОТКЕ';
                        case 'confirmed': return 'ПОДТВЕРЖДЕНО';
                        case 'completed': return 'ЗАВЕРШЕНО';
                        case 'cancelled': return 'ОТМЕНЕНО';
                        default: return b.status?.toUpperCase() || 'В ОБРАБОТКЕ';
                      }
                    })()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ marginTop: '40px', textAlign: 'center', color: '#444' }}>
          <p>У вас пока нет активных бронирований.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;