import React, { useState, useEffect } from 'react';
import '../app.css'; // НЕ ЗАБУДЬ ИМПОРТИРОВАТЬ

const Booking = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ service_id: '', car_model: '', date: '', time: '' });
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost/car/api/index.php?action=get_services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        if (data.length > 0) setFormData(prev => ({ ...prev, service_id: data[0].id }));
      });
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: user.id,
      service_id: formData.service_id,
      car_model: formData.car_model,
      booking_date: formData.date,
      booking_time: formData.time 
    };

    try {
      const response = await fetch('http://localhost/car/api/index.php?action=create_booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.status === 'success') {
        setStatus('success');
        setFormData({ ...formData, car_model: '', date: '', time: '' });
      } else {
        setErrorMessage(result.error || 'Ошибка БД');
        setStatus('error');
      }
    } catch (err) {
      setErrorMessage('Сетевая ошибка');
      setStatus('error');
    }
  };

  // ЭКРАН УСПЕХА
  if (status === 'success') {
    return (
      <div className="booking-page-container">
        <div className="status-card success">
          <svg className="status-icon" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h2 className="accent-text status-title">ЗАЯВКА ПРИНЯТА</h2>
          <p className="status-text">Мы перезвоним вам в течение 15 минут.</p>
          <button onClick={() => setStatus('idle')} className="btn-primary status-btn">НОВАЯ ЗАПИСЬ</button>
        </div>
      </div>
    );
  }

  // ЭКРАН ОШИБКИ
  if (status === 'error') {
    return (
      <div className="booking-page-container">
        <div className="status-card error">
          <svg className="status-icon" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ff4444" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
          <h2 className="status-title" style={{color: '#ff4444'}}>ОШИБКА</h2>
          <p className="status-text">{errorMessage}</p>
          <button onClick={() => setStatus('idle')} className="btn-primary status-btn">ПОПРОБОВАТЬ СНОВА</button>
        </div>
      </div>
    );
  }

  // ФОРМА
  return (
    <div className="booking-page-container">
      <div className="auth-container" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="accent-text" style={{ letterSpacing: '3px', textAlign: 'center' }}>ЗАПИСЬ НА СЕРВИС</h2>
        <form onSubmit={handleBooking} style={{ marginTop: '30px' }}>
          <label style={{ color: '#555', fontSize: '0.7rem' }}>ВЫБЕРИТЕ УСЛУГУ</label>
          <select className="auth-input" value={formData.service_id} onChange={e => setFormData({...formData, service_id: e.target.value})} style={{ background: '#000', color: '#fff' }}>
            {services.map(s => (
              <option key={s.id} value={s.id}>{s.title} — {s.price} ₽</option>
            ))}
          </select>
          <input type="text" placeholder="МОДЕЛЬ АВТОМОБИЛЯ" className="auth-input" value={formData.car_model} onChange={e => setFormData({...formData, car_model: e.target.value})} required />
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="date" className="auth-input" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
            <input type="time" className="auth-input" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} required />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>ПОДТВЕРДИТЬ</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;