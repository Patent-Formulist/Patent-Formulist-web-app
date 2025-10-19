import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/Main';
import Home from './pages/Home';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import './App.css';
import Registration from './pages/Registration';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
