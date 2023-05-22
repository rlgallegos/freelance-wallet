import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import { Routes, Route } from 'react-router-dom';

import Setup from './Setup';
import Profile from './Profile';
import Home from './Home';
import Onboarding from './Onboarding';
import InitialForm from './InitialForm';


const Dashboard: React.FC = () => {
    const [startTour, setStartTour] = useState<boolean>(false)
    const navigate = useNavigate()
    const { user, updateUser } = useUserContext();

    useEffect(() => {
        fetch('/serve-dashboard')
        .then(res => {
            if (res.ok){
                res.json().then(data => updateUser(data) )
            } else {
                navigate('/welcome')
            }
        })
    }, [])


    const handleOnboarding = (): void => {
        setStartTour(true)
    }

  return (
    <div>
        {startTour && <Onboarding />}
        {!user.initialized && <InitialForm userID={user.id} />}
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/setup" element={<Setup />}/>
            <Route path="/profile" element={<Profile />}/>
        </Routes>
        <div className='flex mx-auto'>
            <button id='onboard-button' onClick={handleOnboarding} className='mx-auto p-2 text-center text-primary border border-primary bg-white bg-opacity-80 hover:bg-secondary rounded-lg'>Click to take the tour</button>
        </div>
    </div>
  )
}
export default Dashboard