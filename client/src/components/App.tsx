import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './Welcome';
import NotFound from './NotFound';
import { UserProvider } from './UserContext';
import Navbar from './Navbar';

import '../App.css';
import Dashboard from './Dashboard';
import { useState } from 'react';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <div className="bg-cover bg-top bg-no-repeat h-screen w-screen fixed bg-mobile sm:bg-desktop" >
      <main className='h-full w-full overflow-y-scroll'>
        <UserProvider>

            { isLoggedIn ? <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> : 
            <div id="navbar" className="flex flex-col sm:flex-row justify-between px-6 bg-white bg-opacity-80 font-bold text-xl items-center">
                <h4 className="mx-auto py-2 text-primary">Welcome!</h4>
            </div>}

            <div className='h-full sm:h-3/4 flex flex-col justify-center '>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path='/welcome' element={<Welcome isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
                <Route path='/dashboard/*' element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
            </div>
        </UserProvider>
      </main>
    </div>
  );
}

export default App;
