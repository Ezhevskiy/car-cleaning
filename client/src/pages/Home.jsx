import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="container home-section">
      <div className="home-content">
        <h1 className="hero-title">
          ПРЕМИУМ <br/> <span className="accent-text">ДЕТЕЙЛИНГ</span>
        </h1>
        <p className="hero-description">
          Уникальный подход к уходу за вашим автомобилем. Мы объединили инновационные защитные составы и опыт, чтобы достичь совершенства.
        </p>
        <div className="home-actions">
          <Link to="/services" className="btn-premium">
            КАТАЛОГ УСЛУГ <ArrowRight size={16} />
          </Link>
          <Link to="/booking" className="btn-outline">
            ЗАПИСАТЬСЯ
          </Link>
        </div>
      </div>

      <div className="features-grid">
        <div className="card-premium">
          <Shield className="accent-icon" />
          <h4>ГАРАНТИЯ</h4>
          <p>До 5 лет на покрытия</p>
        </div>
        <div className="card-premium">
          <Star className="accent-icon" />
          <h4>КАЧЕСТВО</h4>
          <p>Премиум химия</p>
        </div>
        <div className="card-premium">
          <Zap className="accent-icon" />
          <h4>СКОРОСТЬ</h4>
          <p>Точно в срок</p>
        </div>
      </div>
    </div>
  );
};

export default Home;