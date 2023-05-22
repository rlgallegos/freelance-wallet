import dayjs from 'dayjs';
import { useState } from 'react';
import { useUserContext } from './UserContext';

const AddIncome: React.FC = () => {
    //States
    const [income, setIncome] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    //Context
    const { updateUser, user } = useUserContext()

    //Gather important DateTime values
    const currentDate = dayjs()
    const currentWeekOfMonth = Math.ceil(currentDate.date() / 7)
    
    console.log(currentWeekOfMonth)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Build object
        const fetchData = {
            income: income,
            week: currentWeekOfMonth
        }

        fetch(`/incomes/${user.income.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchData)
        }).then(res => {
            if (res.ok) {
                res.json().then(data => updateUser(data))
            } else {
                res.json().then(data => setErrorMessage(data.error))
            }
        })
        e.currentTarget.reset()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIncome(e.target.value)
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="number" name='income'/>
                <input type="submit" value="Add Income for Current Day" />
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <br />
        </div>
    )
}
export default AddIncome