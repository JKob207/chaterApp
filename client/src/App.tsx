import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import AuthRequired from './components/AuthRequired/AuthRequired';
import Layout from './components/Layout/Layout';
import ChatDashboard from './routes/ChatDashboard/ChatDashboard';
import ContactBook from './routes/ContactBook/ContactBook';

export default function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route element={<AuthRequired />}>
        <Route path='main' element={<Layout />}>
          <Route index element={<ChatDashboard />} />
          <Route path='contactbook' element={<ContactBook />} />
        </Route>
      </Route>
    </Route>
  ));

  return(
    <>
      <RouterProvider router={router} />
    </>
  )
}
