import React, { useState } from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

export default function Welcome() {
    const [form, setForm] = useState<string>('login-button')


    function handleClick(e: React.MouseEvent<HTMLButtonElement>){
        setForm(e.currentTarget.id)
    }

  return (
    <div>
        <div>
            <h1>Welcome!</h1>
        </div>
        <div>
            {form === 'login-button' ? <LoginForm /> : <SignupForm /> }
        </div>
        <button onClick={handleClick} id='login-button'>Login</button>
        <button onClick={handleClick} id='signup-button'>Signup</button>
    </div>
  )
}