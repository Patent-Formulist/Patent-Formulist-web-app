import { Routes, Route } from 'react-router-dom'

import WelcomeLayout from './layouts/WelcomeLayout'

import Welcome from './pages/unauthorized/Welcome'
import About from './pages/unauthorized/About'
import FAQ from './pages/unauthorized/FAQ'
import Contacts from './pages/unauthorized/Contacts'

import './styles/App.css'

export default function App() {
  return (
      <Routes>
        <Route element={<WelcomeLayout />}>
          <Route index element={<Welcome />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Routes>
  )
}