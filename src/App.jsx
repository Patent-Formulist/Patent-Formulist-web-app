import { Routes, Route } from 'react-router-dom'

import { PatentsProvider } from './contexts/PatentsContext'
import { AnalogTaskProvider } from './contexts/AnalogTaskContext'
import { ToastProvider } from './contexts/ToastContext'

import AuthorizedUserRoute from './routes/AuthorizedUserRoute'

import WelcomeLayout from './layouts/welcome/WelcomeLayout'
import WorkspaceLayout from './layouts/workspace/WorkspaceLayout'
import PatentAnalogLayout from './layouts/analog/PatentAnalogLayout'
import ProfileLayout from './layouts/profile/ProfileLayout'

import Welcome from './features/welcome/pages/Welcome'
import About from './features/welcome/pages/About'
import FAQ from './features/welcome/pages/FAQ'
import Contacts from './features/welcome/pages/Contacts'

import LogIn from './features/auth/pages/LogIn'
import SignIn from './features/auth/pages/SignIn'

import WorkspaceMain from './layouts/workspace/WorkspaceMain'

import PatentCreation from './features/patent_creation/pages/PatentCreation'
import PatentEdit from './features/patent_edit/pages/PatentEdit'

import Analogs from './features/analog/pages/Analogs'

import ProfileMain from './features/profile/pages/ProfileMain'
import ProfileSettings from './features/profile/pages/ProfileSettings'

import NotFound from './features/not_found/pages/NotFound'

import './App.css'


export default function App() {
  return (
    <PatentsProvider>
      <AnalogTaskProvider>
        <ToastProvider>
          <Routes>
            <Route path='/' element={<WelcomeLayout />}>
              <Route index element={<Welcome />} />
              <Route path='about' element={<About />} />
              <Route path='faq' element={<FAQ />} />
              <Route path='contacts' element={<Contacts />} />
              <Route path='login' element={<LogIn />} />
              <Route path='signin' element={<SignIn />} />
            </Route>
            <Route element={<AuthorizedUserRoute />}>
              <Route path='/workspace' element={<WorkspaceLayout />}>
                <Route index element={<WorkspaceMain />} />
                <Route path='documentation' element={<div>Документация</div>}/>
                <Route path='questions' element={<FAQ />}/>
                <Route path='patent-creation' element={<PatentCreation />} />
                <Route path='patents/:id/edit' element={<PatentEdit />}/>
                <Route path='patents/:id' element={<PatentAnalogLayout />}>
                  <Route path='analogs' element={<Analogs />} />
                  <Route path='attributes' element={<div>Атрибуты аналогов</div>} />
                  <Route path='prototype' element={<div>Прототип</div>} />
                </Route>
              </Route>
              <Route path="/profile" element={<ProfileLayout />}>
                <Route index element={<ProfileMain />} />
                <Route path="settings" element={<ProfileSettings />} />
                <Route path="feedback" element={<div>Обратная связь</div>} />
              </Route>
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </ToastProvider>
      </AnalogTaskProvider>
    </PatentsProvider>
  )
}
