import { Routes, Route } from 'react-router-dom'

import WelcomeLayout from './layouts/WelcomeLayout'

import Welcome from './pages/welcome_pages/Welcome'
import About from './pages/welcome_pages/About'
import FAQ from './pages/welcome_pages/FAQ'
import Contacts from './pages/welcome_pages/Contacts'
import LogIn from './pages/auth_pages/LogIn'
import SignIn from './pages/auth_pages/SignIn'
import NotFound from './pages/NotFound'

import './styles/App.css'

export default function App() {
  return (
      <Routes>
        <Route element={<WelcomeLayout />}>
          <Route index element={<Welcome />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path='login' element={<LogIn />} />
          <Route path='signin' element={<SignIn />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}