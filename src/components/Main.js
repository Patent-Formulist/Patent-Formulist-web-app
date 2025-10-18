import { Routes, Route } from 'react-router-dom';
import '../styles/Main.css'
import Home from './Home';
import About from './About';
import FAQ from './FAQ';
import Contacts from './Contacts';
import Login from './Login';

function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default Main;
