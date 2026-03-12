import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost/car/api/index.php?action=get_services')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h2 className="accent-text">НАШИ УСЛУГИ</h2>
      <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {services.map(service => (
          <div key={service.id} className="service-card" style={{ background: '#111', padding: '20px', border: '1px solid #222' }}>
            <h3 style={{ color: '#fff' }}>{service.name}</h3>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>{service.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{service.price} ₽</span>
              <Link to={`/services/${service.id}`} className="btn-primary" style={{ padding: '8px 15px', fontSize: '0.7rem' }}>ДЕТАЛИ</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;