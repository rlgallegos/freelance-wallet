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
        <div className=''>
            <h1 className="text-2xl text-primary">Add to what you've earned today</h1>
            <form className='mx-auto text-center border border-primary w-4/5 sm:w-1/2 my-4 rounded-sm p-4' onSubmit={handleSubmit}>
                <input className='border-2 border-secondary my-2 px-1 ' onChange={handleChange} type="number" name='income' placeholder='Ex 123'/>
                <br />
                <input className='clickable mx-auto p-2 text-center text-primary border border-primary hover:bg-secondary bg-opacity-80 rounded-lg my-4' type="submit" value="Add Income for Current Day" />
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <br />
        </div>
    )
}
export default AddIncome