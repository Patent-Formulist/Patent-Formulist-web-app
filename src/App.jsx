import { Routes, Route } from 'react-router-dom';

import AutorizedUserRoute from './routes/AutorizedUserRoute';

import WelcomeLayout from './features/welcome/layouts/WelcomeLayout';
import WorkspaceLayout from'./features/workspace/layouts/WorkspaceLayout';

import Welcome from './features/welcome/pages/Welcome';
import About from'./features/welcome/pages/About';
import FAQ from'./features/welcome/pages/FAQ';
import Contacts from'./features/welcome/pages/Contacts';

import LogIn from'./features/auth/pages/LogIn';
import SignIn from'./features/auth/pages/SignIn';

import WorkspaceMain from './features/workspace/pages/WorkspaceMain';

import NotFound from'./features/not_found/pages/NotFound';

import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<WelcomeLayout />}>
        <Route index element={<Welcome />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="login" element={<LogIn />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
      <Route element={<AutorizedUserRoute />}>
        <Route path="workspace" element={<WorkspaceLayout />}>
          <Route index element={<WorkspaceMain />} />
          <Route path="documentation" element={<div>Документация</div>}/>
          <Route path="questions" element={<FAQ />}/>
          <Route path="patents/:id" element={<div>Патент</div>} />
        </Route>
        <Route path="profile" element={<div>Профиль</div>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}