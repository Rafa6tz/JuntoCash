import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice.jsx'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if(isSuccess || user){
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }

  return (
    <div className='bg-background flex justify-center h-screen'>
    <Card className='w-5/6 max-h-4/7 bg-card text-card-foreground mt-16'>
      <CardHeader>
        <CardTitle>Login Page</CardTitle>
        <CardDescription>Entre para controlar suas finanças!</CardDescription>
        <CardAction>
          <Button variant="link">Register</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='text-sm'>
          <input onChange={handleChange} id='email' name='email' type="email" placeholder='Email' className='border border-gray-300 rounded-md p-2 w-full mb-4'/>
          <input onChange={handleChange} id='password' name='password' type="password" placeholder='Password' className='border border-gray-300 rounded-md p-2 w-full mb-4'/>
          <Button type='submit' className='w-full'>Login</Button>
        </form>
      </CardContent>
    </Card>
    </div>
  )
}

export default Login