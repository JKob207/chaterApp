import {useState} from 'react'
import './App.css'
import { User, UserFormData } from './types.ts'
import { addUser } from './services/api.ts'

export default function App() {
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    login: "",
    password: "",
    repeatPassword: ""
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = event.target
      setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value
      }))
  }

  async function handleSubmit()
  {
    try {
      // check values!!!

      const newUser: User = {
        email: formData.email,
        login: formData.login,
        password: formData.password
      }

      await addUser(newUser)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
      <h1>Hello React!</h1>
      <input 
        type='email' 
        name='email'
        placeholder='email'
        value={formData.email}
        onChange={handleChange}
      />
      <input 
        type='text' 
        name='login'
        placeholder='login'
        value={formData.login}
        onChange={handleChange}
      />
      <input 
        type='password' 
        name='password'
        placeholder='password'
        value={formData.password}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}
