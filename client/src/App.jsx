import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Адрес вашего PHP-скрипта в XAMPP
    axios.get('http://localhost/car/index.php')
      .then(res => setServices(res.data))
      .catch(err => console.error("Ошибка связи с API:", err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Клининг Авто: Список услуг</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {services.map(service => (
          <div key={service.id} style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            borderRadius: '8px',
            width: '200px' 
          }}>
            <h3>{service.title}</h3>
            <p style={{ color: '#007bff', fontWeight: 'bold' }}>{service.price} руб.</p>
            <button>Заказать</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;