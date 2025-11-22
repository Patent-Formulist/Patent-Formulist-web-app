import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import AutorizedUserRoute from './routes/AutorizeduserRoute';

const WelcomeLayout = lazy(() => import('./features/welcome/layouts/WelcomeLayout'));

const Welcome = lazy(() => import('./features/welcome/pages/Welcome'));
const About = lazy(() => import('./features/welcome/pages/About'));
const FAQ = lazy(() => import('./features/welcome/pages/FAQ'));
const Contacts = lazy(() => import('./features/welcome/pages/Contacts'));
const LogIn = lazy(() => import('./features/auth/pages/LogIn'));
const SignIn = lazy(() => import('./features/auth/pages/SignIn'));
const NotFound = lazy(() => import('./features/not_found/pages/NotFound'));

import './App.css';

export default function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route element={<WelcomeLayout />}>
          <Route index element={<Welcome />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
        <Route element={<AutorizedUserRoute />}>
          <Route element={<></>}>
            <Route index path="workspace" element={<></>} />
            <Route path="workspace/documentation" element={<></>} />
            <Route path="workspace/questions" element={<></>} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}