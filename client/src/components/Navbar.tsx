import { useState } from "react";
import { useUserContext } from "./UserContext"
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const tailwindCSSLink = "text-primary sm:mx-20"

    const { user } = useUserContext();
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)

    const handleLogout = (): void => {
        fetch('/logout', {
            method: "DELETE"
        }).then(() => {
            setIsLoggedIn(false)
            navigate('/welcome')
        })
    }

    return(
    <div id="navbar" className="flex flex-col sm:flex-row justify-between px-6 bg-white bg-opacity-80 font-bold text-xl items-center">
        {user.id && isLoggedIn ? <>
            <h3 className="text-primary">Hello {user.username}!</h3>
            <div className="flex flex-col sm:flex-row">
                <Link to='/dashboard/' className={tailwindCSSLink}>
                    <div className="hover:bg-primary hover:text-white rounded-sm py-2">
                        <h3 className="px-8">Home</h3>
                    </div>
                </Link>
                <Link to='/dashboard/profile' className={tailwindCSSLink} >
                    <div className="hover:bg-primary hover:text-white rounded-sm py-2">
                        <h3 className="px-8">Profile</h3>
                    </div>                    
                </Link>
                <Link to='/dashboard/setup' className={tailwindCSSLink} >
                <div className="hover:bg-primary hover:text-white rounded-sm py-2">
                        <h3 className="px-8">Setup</h3>
                    </div>
                </Link>
            </div>
            <button onClick={handleLogout} className="hover:bg-primary hover:text-white rounded-sm py-2 px-6 text-primary">Logout</button>
        </> : <h4 className="mx-auto py-2">Welcome!</h4>}
    </div>
    )
}
export default Navbar