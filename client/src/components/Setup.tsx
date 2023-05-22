import { useState } from "react"
import AddIncome from "./AddIncome"

const Setup: React.FC = () => {
    const [addIncome, setAddIncome] = useState<boolean>(false)

    const handleClick = () => {
        setAddIncome(true)
    }

    return (
        <div>
            <h1>Setup Page</h1>
            {addIncome && <AddIncome />}
            {!addIncome && <button onClick={handleClick}>Add Income</button>}
        </div>
    )
}
export default Setup