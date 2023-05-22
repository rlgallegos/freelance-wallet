import React, { useState } from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

const Welcome: React.FC = () => {
    const [form, setForm] = useState<string>('login-button')


    function handleClick(e: React.MouseEvent<HTMLButtonElement>){
        setForm(e.currentTarget.id)
    }

  return (
    <div>
        <div>
            {form === 'login-button' ? <LoginForm /> : <SignupForm /> }
        </div>
        <button onClick={handleClick} id='login-button'>Login</button>
        <button onClick={handleClick} id='signup-button'>Signup</button>
    </div>
  )
}
export default Welcome