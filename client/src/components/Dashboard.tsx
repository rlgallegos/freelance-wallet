import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


interface User {
    id: number;
    username: string;
}


export default function Dashboard() {
    const navigate = useNavigate()

    const [user, setUser] = useState<User>({
        id: 0,
        username: ''
    })

    useEffect(() => {
        fetch('/dashboard')
        .then(res => {
            if (res.ok){
                res.json().then(data => setUser(data) )
            } else {
                navigate('/welcome')
            }
        })
    }, [])


  return (
    <div>Dashboard</div>
  )
}