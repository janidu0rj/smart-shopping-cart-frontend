import React from 'react';
import { motion } from 'framer-motion';
import cashierImg from '../assets/cashier.jpeg';
import { useNavigate } from 'react-router-dom';
import './CashierHome.css';

const CashierHome: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="cashier-container">
      <header className="cashier-header">
        <div className="cashier-title">Smart Shopping</div>
        <nav className="cashier-nav">
          <button onClick={() => navigate('/cashierHome')} className="nav-button">
            Home
          </button>
          <button onClick={() => navigate('/dashboard')} className="nav-button">
            Profile
          </button>
          <button onClick={() => navigate('/logout')} className="nav-button">
            Logout
          </button>
        </nav>
      </header>

      <main className="cashier-main">
        {/* Text Section */}
        <motion.div
          className="cashier-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="cashier-heading">
            Working with the <span className="gradient-text">Cashier</span>
          </h1>
          <p className="cashier-description">
            Designed to help cashiers work faster and smarter — no more manual updates or long lines, just smooth and accurate billing.
          </p>
          <ul className="cashier-list">
            <li>⚡ Faster queue handling</li>
            <li>🛒 Easy-to-use cashier UI</li>
            <li>🔁 Auto updates of checkout results</li>
          </ul>
          <motion.button
            onClick={() => navigate('/counter')}
            className="cashier-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="cashier-image-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="cashier-image-box">
            <img
              src={cashierImg}
              alt="Cashier Illustration"
              className="cashier-image"
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CashierHome;
