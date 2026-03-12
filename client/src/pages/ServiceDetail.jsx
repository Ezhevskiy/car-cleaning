import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { fetchServiceById } from '../api'; 

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchServiceById(id)
      .then(data => {
        setService(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Услуга не найдена в базе данных");
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="status-screen">
      <Loader2 className="animate-spin" size={48} />
      <p>Синхронизация данных...</p>
    </div>
  );

  if (error || !service) return (
    <div className="status-screen error-text">
      <h2>ОШИБКА ИНИЦИАЛИЗАЦИИ</h2>
      <p>{error}</p>
      <Link to="/services" className="back-link">Вернуться к каталогу</Link>
    </div>
  );

  return (
    <div className="container detail-container">
      <Link to="/services" className="back-link">
        <ArrowLeft size={20} /> НАЗАД К КАТАЛОГУ
      </Link>
      
      <div className="detail-grid">
        {/* Левая колонка: Фото */}
        <div className="detail-image-wrapper">
          <div className="detail-image-placeholder"></div>
        </div>
        
        {/* Правая колонка: Информация */}
        <div className="detail-info">
          <h1 className="detail-title">{service.title}</h1>
          <p className="detail-description">{service.description}</p>
          
          <div className="features-section">
            <h3 className="section-subtitle">ЧТО ВКЛЮЧЕНО:</h3>
            <ul className="features-list">
              {service.features?.map(item => (
                <li key={item} className="feature-item">
                  <CheckCircle size={18} className="accent-icon-small" /> {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="price-card">
            <span className="price-label">СТОИМОСТЬ УСЛУГИ</span>
            <div className="price-value">{service.price} ₽</div>
          </div>
          
          <Link to="/booking" className="btn-premium full-width-btn">
            ЗАБРОНИРОВАТЬ ВИЗИТ
          </Link>
        </div>
      </div>
    </div>
  );
}