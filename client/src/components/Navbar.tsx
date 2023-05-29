import { useState } from "react";
import { useUserContext } from "./UserContext"
import { Link, useNavigate } from "react-router-dom";
import { MdExpandMore, MdExpandLess } from "react-icons/md";


const Navbar: React.FC = () => {
    const tailwindCSSLink = "text-primary sm:mx-20"

    const { user } = useUserContext();
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)
    const [isOpenNavBar, setIsOpenNavBar] = useState(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) ? false : true
      );

    const handleLogout = (): void => {
        fetch('/logout', {
            method: "DELETE"
        }).then(() => {
            setIsLoggedIn(false)
            navigate('/welcome')
        })
    }

    const handleNavBar = (): void => {
        setIsOpenNavBar(!isOpenNavBar)
    }

    return(
    <div id="navbar" className="flex flex-col sm:flex-row justify-between px-6 bg-white bg-opacity-80 font-bold text-xl items-center">
        {user.id && isLoggedIn ? <>
            <h3 className="text-primary my-2 md:my-auto">Hello {user.username}!</h3>
            { !isOpenNavBar ?
            <div className="sm:hidden my-2 clickable">
            <MdExpandMore onClick={handleNavBar}/>
            </div>: 
            <div className="sm:hidden my-2 clickable">
            <MdExpandLess onClick={handleNavBar} />
            </div>}
            <div className={`flex flex-col sm:flex-row ${isOpenNavBar ? "max-h-screen" : "max-h-0"} overflow-y-hidden`}>
                <Link to='/dashboard/' className={tailwindCSSLink}>
                    <div id="home" className="hover:bg-primary hover:text-white rounded-sm py-2">
                        <h3 className="px-8">Home</h3>
                    </div>
                </Link>
                <Link to='/dashboard/profile' className={tailwindCSSLink} >
                    <div id='profile' className="hover:bg-primary hover:text-white rounded-sm py-2">
                        <h3 className="px-8">Profile</h3>
                    </div>                    
                </Link>
                <Link to='/dashboard/setup' className={tailwindCSSLink} >
                    <div id="setup" className="hover:bg-primary hover:text-white rounded-sm py-2">
                        <h3 className="px-8">Setup</h3>
                    </div>
                </Link>
            </div>
            {isOpenNavBar && <button onClick={handleLogout} className="hover:bg-primary hover:text-white rounded-sm py-2 px-6 text-primary">Logout</button>}
        </> : <h4 className="mx-auto py-2 text-primary">Welcome!</h4>}
    </div>
    )
}
export default Navbar