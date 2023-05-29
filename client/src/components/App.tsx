import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './Welcome';
import NotFound from './NotFound';
import { UserProvider } from './UserContext';
import Navbar from './Navbar';

import '../App.css';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="bg-cover bg-top bg-no-repeat h-screen w-screen fixed bg-mobile sm:bg-desktop" >
      <main className='h-full w-full overflow-y-scroll'>
        <UserProvider>
            <Navbar />
            <div className='h-full sm:h-3/4 flex flex-col justify-center '>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path='/welcome' element={<Welcome />}/>
                <Route path='/dashboard/*' element={<Dashboard />}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
            </div>
        </UserProvider>
      </main>
    </div>
  );
}

export default App;
