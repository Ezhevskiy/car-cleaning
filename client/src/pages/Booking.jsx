import React, { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

const Booking = () => {
  const [formData, setFormData] = useState({ car: '', phone: '', service: 'wash' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  if (status === 'success') {
    return (
      <div className="container status-screen">
        <div className="card-premium centered-card">
          <CheckCircle2 size={60} className="success-icon" />
          <h2>ЗАЯВКА ПРИНЯТА</h2>
          <p>Мы перезвоним вам в течение 15 минут.</p>
          <button onClick={() => setStatus('idle')} className="btn-premium">НОВАЯ ЗАПИСЬ</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container form-section">
      <form className="card-premium booking-form" onSubmit={handleSubmit}>
        <h2 className="form-title">БРОНИРОВАНИЕ</h2>
        
        <div className="input-group">
          <label>АВТОМОБИЛЬ</label>
          <input 
            type="text" placeholder="Марка и модель" className="input-premium" required 
            onChange={e => setFormData({...formData, car: e.target.value})}
          />
        </div>
        
        <div className="input-group">
          <label>КОНТАКТНЫЙ ТЕЛЕФОН</label>
          <input 
            type="tel" placeholder="+7 (___) ___-__-__" className="input-premium" required 
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        
        <div className="input-group">
          <label>УСЛУГА</label>
          <select 
            className="input-premium" 
            value={formData.service}
            onChange={e => setFormData({...formData, service: e.target.value})}
          >
            <option value="wash">Трехфазная мойка</option>
            <option value="chem">Восстановление салона</option>
            <option value="coat">Керамика</option>
          </select>
        </div>

        <button type="submit" className="btn-premium full-width" disabled={status === 'loading'}>
          {status === 'loading' ? <Loader2 className="animate-spin" /> : 'ПОДТВЕРДИТЬ ЗАПИСЬ'}
        </button>
      </form>
    </div>
  );
};

export default Booking;