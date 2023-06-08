import { useState } from "react"

import AddIncome from "./AddIncome"
import UserSettings from "./UserSettings"

const Setup: React.FC = () => {
    const [addIncome, setAddIncome] = useState<boolean>(false)
    const [editUser, setEditUser] = useState<boolean>(false)

    const handleAddIncome = () => {
        setAddIncome(!addIncome)
    }
    const handleEditUser = () => {
        setEditUser(!editUser)
    }

    return (
        <>
            <div className="text-center w-full flex items-center my-4">
                    <div className={`float-left flex flex-col w-4/5 sm:w-1/3 mx-auto bg-white bg-opacity-80 p-12 m-4 border-2 border-primary rounded-md transition-all transition-duration-900 ease-in-out ${addIncome ? 'max-h-auto' : 'max-h-full'}`}>
                        <h2 className='text-xl font-bold text-primary mb-4'>Add Income</h2>
                        {addIncome && <AddIncome />}
                        {!addIncome && <button className='mx-auto p-2 text-center text-primary border border-primary hover:bg-secondary bg-opacity-80 rounded-lg my-4' onClick={handleAddIncome}>Open Form</button>}
                        {addIncome && <button className='mx-auto p-2 text-center text-primary border border-primary hover:bg-secondary bg-opacity-80 rounded-lg my-4' onClick={handleAddIncome}>Close</button>}
                    </div>
                    <div className='float-right flex flex-col w-4/5 sm:w-1/3 mx-auto bg-white bg-opacity-80 p-12 m-4 border-2 border-primary rounded-md'>
                        <h2 className='text-xl font-bold text-primary mb-4'>User Settings</h2>
                        {editUser && <UserSettings />}
                        {!editUser && <button className='mx-auto p-2 text-center text-primary border border-primary hover:bg-secondary bg-opacity-80 rounded-lg my-4' onClick={handleEditUser}>Open Settings</button>}
                        {editUser && <button className='mx-auto p-2 text-center text-primary border border-primary hover:bg-secondary bg-opacity-80 rounded-lg my-4' onClick={handleEditUser}>Close</button>}
                    </div>
            </div>
        </>
    )
}
export default Setup