import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './routes/Login/Login';
import Register from './routes/Register/Register';
import AuthRequired from './components/AuthRequired/AuthRequired';
import Protected from './routes/Protected/Protected';

export default function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route element={<AuthRequired />}>
        <Route path='protected' element={<Protected />} />
      </Route>
    </Route>
  ));

  return(
    <>
      <RouterProvider router={router} />
    </>
  )
}
