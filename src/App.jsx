import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from './components/Main.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import FAQ from './pages/FAQ.jsx';
import Contacts from './pages/Contacts.jsx';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import NotFound from './pages/NotFound.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import CleanLayout from './layouts/CleanLayout.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Main />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contacts" element={<Contacts />} />
      </Route>
      <Route path="/" element={<CleanLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;