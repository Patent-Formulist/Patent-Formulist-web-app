import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Home from './pages/Home';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import CleanLayout from './layouts/CleanLayout';
import './App.css';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Route>

      <Route element={<CleanLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
