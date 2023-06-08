import React, { useState } from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

interface NavbarProps {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  }

const Welcome: React.FC<NavbarProps> = ({isLoggedIn, setIsLoggedIn}) => {
    const [form, setForm] = useState<string>('login-button')


    function handleClick(e: React.MouseEvent<HTMLButtonElement>){
        setForm(e.currentTarget.id)
    }

  return (
    <div className='bg-white bg-opacity-80 w-4/5 sm:w-1/3 mx-auto mb-4 text-center flex flex-col justify-center my-2 border-2 border-primary rounded-md p-6'>
        {!isLoggedIn ? 
            <div className='grid grid-cols-2 g'>
                <button className='mx-auto py-1 px-3 text-center text-primary border border-primary hover:bg-secondary bg-opacity-80 rounded-lg' onClick={handleClick} id='login-button'>Returning User?</button>
                <button className='mx-auto py-1 px-3 text-center text-primary border border-primary hover:bg-secondary bg-opacity-80 rounded-lg' onClick={handleClick} id='signup-button'>First Time?</button>
            </div> : 
            <h1 className="mx-auto py-2 text-primary text-xl font-bold">Welcome!</h1> }
        {!isLoggedIn && <div className='my-4 text flex justify-center'>
            {form === 'login-button' ? <LoginForm /> : <SignupForm /> }
        </div>}
    </div>
  )
}
export default Welcome