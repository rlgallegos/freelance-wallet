import { useState } from "react"
import AddIncome from "./AddIncome"

const Setup: React.FC = () => {
    const [addIncome, setAddIncome] = useState<boolean>(false)

    const handleClick = () => {
        setAddIncome(true)
    }

    return (
        <div className='bg-white bg-opacity-80 w-4/5 sm:w-2/3 mx-auto h-full mb-4 text-center flex flex-col justify-center border-2 border-primary rounded-md'>
            {addIncome && <AddIncome />}
            {!addIncome && <button className='mx-auto p-2 text-center text-primary border border-primary hover:bg-secondary bg-opacity-80 rounded-lg my-4' onClick={handleClick}>Add Income</button>}
        </div>
    )
}
export default Setup