import { Routes, Route } from 'react-router-dom'

import AutorizedUserRoute from './routes/AutorizeduserRoute'

import WelcomeLayout from './features/welcome/layouts/WelcomeLayout'

import Welcome from './features/welcome/pages/Welcome'
import About from './features/welcome/pages/About'
import FAQ from './features/welcome/pages/FAQ'
import Contacts from './features/welcome/pages/Contacts'
import LogIn from './features/auth/pages/LogIn'
import SignIn from './features/auth/pages/SignIn'
import NotFound from './features/not_found/pages/NotFound'

import './App.css'

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
      <Route element={<AutorizedUserRoute />}>
        <Route element={<></>}>
          <Route index path='workspace' element={<></>} />
          <Route path='workspace/documentation' element={<></>} />
          <Route path='workspace/questions' element={<></>} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}