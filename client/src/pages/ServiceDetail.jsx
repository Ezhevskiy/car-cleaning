import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, CheckCircle } from 'lucide-react';

const ServiceDetail = () => {
  const { id } = useParams(); // Берем ID из URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost/car/api/index.php?action=get_service&id=${id}`)
      .then(res => res.json())
      .then(data => {
        setService(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container">Загрузка...</div>;
  if (!service) return <div className="container">Услуга не найдена</div>;

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <Link to="/services" className="nav-link" style={{ marginBottom: '30px', display: 'inline-flex', alignItems: 'center' }}>
        <ChevronLeft size={16} /> НАЗАД К СПИСКУ
      </Link>

      <div className="service-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
        {/* Левая часть: Описание */}
        <div>
          <h1 className="accent-text" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{service.name}</h1>
          <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.1rem' }}>{service.description}</p>
          
          <div style={{ marginTop: '30px' }}>
             <h3 style={{ color: '#fff', marginBottom: '15px' }}>ЧТО ВХОДИТ:</h3>
             <ul style={{ listStyle: 'none', padding: 0 }}>
                {/* Если в БД есть поле features, можно вывести списком */}
                <li style={{ color: '#888', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={16} color="var(--accent)" /> Профессиональная химия
                </li>
                <li style={{ color: '#888', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={16} color="var(--accent)" /> Гарантия на результат
                </li>
             </ul>
          </div>
        </div>

        {/* Правая часть: Цена и Действие */}
        <div style={{ background: '#111', padding: '40px', border: '1px solid #222', borderRadius: '4px', alignSelf: 'start' }}>
          <p style={{ color: '#888', marginBottom: '5px' }}>СТОИМОСТЬ УСЛУГИ:</p>
          <h2 style={{ color: '#fff', fontSize: '3rem', marginBottom: '30px' }}>{service.price} ₽</h2>
          
          <Link to="/booking" state={{ serviceId: service.id }} className="btn-primary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
            ЗАПИСАТЬСЯ НА СЕАНС
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;