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
      <header>
      </header>
      <main>
        <UserProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path='/welcome' element={<Welcome />}/>
                <Route path='/dashboard/*' element={<Dashboard />}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </UserProvider>
      </main>
    </div>
  );
}

export default App;
