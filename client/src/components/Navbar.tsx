import { useState } from "react";
import { useUserContext } from "./UserContext"
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const tailwindCSSLink = "text-primary_dark sm:mx-20"

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
    console.log(user.id)
    console.log(isLoggedIn)

    return(
    <div id="navbar" className="flex flex-col sm:flex-row justify-between py-4 px-6 bg-white bg-opacity-80 font-bold">
        {user.id && isLoggedIn ? <>
            <h3 className="text-primary_dark">Hello {user.username}!</h3>
            <div className="flex flex-col sm:flex-row">
                <Link to='/dashboard/' className={tailwindCSSLink}>Home</Link>
                <Link to='/dashboard/profile' className={tailwindCSSLink} >Profile</Link>
                <Link to='/dashboard/setup' className={tailwindCSSLink} >Setup</Link>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </> : <h4>Welcome!</h4>}
    </div>
    )
}
export default Navbar