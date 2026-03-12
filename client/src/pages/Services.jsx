import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchServices } from '../api';

const Services = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="container" style={{padding: '60px 0'}}>Загрузка каталога...</div>;

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <h2 style={{ letterSpacing: '4px', fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '20px' }}>КАТАЛОГ</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2px', background: 'var(--border)' }}>
        {data.map(s => (
          <div key={s.id} className="card-premium">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>{s.title}</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '30px' }}>{s.price} ₽</div>
            <Link to={`/services/${s.id}`} style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '1px' }}>
              ДЕТАЛИ УСЛУГИ →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;