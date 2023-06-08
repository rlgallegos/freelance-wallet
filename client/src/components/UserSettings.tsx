import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from './UserContext';


const UserSettings: React.FC = () => {
    const [confirmPopup, setConfirmPopup] = useState<boolean>(false)

    const { user } = useUserContext()

    // const navigate = useNavigate()

    const handleConfirmDelete = () => {
        setConfirmPopup(!confirmPopup)
    }
    const handleDeleteUser = () => {
        fetch(process.env.REACT_APP_API_URL + `/users/${user.id}`, {
            method: "DELETE"
        }).then(() => window.location.href = '/').catch(err => console.log(err))
    }

    return (
        <div>
            {!confirmPopup && <button className="mx-auto py-1 px-3 text-center text-primary border border-primary hover:bg-secondary bg-opacity-80 rounded-lg my-1" onClick={handleConfirmDelete}>Delete User</button>}
            {confirmPopup && <><p>Are you sure? This action is irreversible.</p>
            <div>
                <button className="mx-4 py-1 px-3 text-center text-primary border border-primary hover:bg-secondary bg-opacity-80 rounded-lg my-1" onClick={handleDeleteUser}>Delete</button>
                <button className="mx-4 py-1 px-3 text-center text-primary border border-primary hover:bg-secondary bg-opacity-80 rounded-lg my-1" onClick={handleConfirmDelete}>Cancel</button>
            </div></>}
        </div>
    )
}
export default UserSettings