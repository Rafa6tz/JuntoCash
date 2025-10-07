import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice.jsx'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { name, email, password, confirmPassword } = formData

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

    if(password !== confirmPassword){
      console.log('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData))
    }
  }

  if(isLoading){
    return <h2>Loading...</h2>
  }

  return (
    <div className='bg-background flex justify-center min-h-screen pt-20'>
    <Card className='w-5/6 bg-card text-card-foreground text-sm mt-6 gap-0'>
      <CardHeader>
        <CardTitle>Register Page</CardTitle>
        <CardDescription>Register an user to start</CardDescription>
        <CardAction>
          <Button variant="link">Login</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='text-sm'>
          <input onChange={handleChange} id='name' name='name' type="text" placeholder='Name' className='border border-gray-300 rounded-md p-2 w-full mb-4'/>
          <input onChange={handleChange} id='email' name='email' type="email" placeholder='Email' className='border border-gray-300 rounded-md p-2 w-full mb-4'/>
          <input onChange={handleChange} id='password' name='password' type="password" placeholder='Password' className='border border-gray-300 rounded-md p-2 w-full mb-4'/>
          <input onChange={handleChange} id='confirmPassword' name='confirmPassword' type="password" placeholder='Confirm Password' className='border border-gray-300 rounded-md p-2 w-full mb-4'/>
          <Button type='submit' className='w-full'>Register</Button>
        </form>
      </CardContent>
    </Card>
    </div>
  )
}

export default Register