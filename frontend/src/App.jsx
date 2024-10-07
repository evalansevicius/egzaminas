import React, { useState } from 'react';
import './App.css'; // Custom CSS for styling

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="Roast & Toast" />
        </div>
        <div className="nav">
          <input type="search" placeholder="Search" className="search-bar" />
          <button className="menu-icon" onClick={toggleMenu}>
            ☰
          </button>
        </div>
      </header>

      {/* Hamburger Menu */}
      <nav className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#cart">CART</a></li>
          <li><a href="#home">HOME</a></li>
          <li><a href="#coffee">COFFEE</a></li>
          <li><a href="#learn">LEARN</a></li>
          <li><a href="#about">ABOUT US</a></li>
          <li><a href="#contact">CONTACT US</a></li>
        </ul>
        <div className="login-link">
          <a href="#login">LOGIN</a>
        </div>
      </nav>

      <main className="main-content">
        <div className="overlay">
          <h1>Always</h1>
          <h2 className="highlight">FAIRLY TRADED</h2>
          <h1>Always</h1>
          <h2 className="highlight">ORGANIC</h2>
          <p>Make your morning ritual one you can feel good about</p>
          <button className="shop-button">SHOP</button>
        </div>

        <div className="coffee-shop">
          
        </div>
      </main>
    </div>
  );
};

export default App;