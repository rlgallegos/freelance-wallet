import { useEffect, useState } from 'react';
import { useUserContext } from './UserContext';

const Profile: React.FC = () => {
    const tailwindCSSCell: string = 'text-primary text-left text-md my-4 py-1 border-y border-primary w-1/5'
    const tailwindCSSHead: string = 'text-primary text-left text-md my-4 py-1 font-bold text-lg w-1/5'

    const [positiveBalance, setPositiveBalance] = useState<number>(0)

    const { user } = useUserContext()
    const { average_monthly_expenses, average_weekly_income } = user

    //Calculate Positive balance
    useEffect(() => {
        let incomeArray: number[] = [user.income.week1, user.income.week2, user.income.week3, user.income.week4]
        setPositiveBalance( (average_monthly_expenses - (incomeArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0))) *-1 )
    }, [user])


    const setNumber = (num: number): number => {
        return num < 0 ? 0 : num
    }

    return (
        <div className='bg-white bg-opacity-80 w-4/5 sm:w-2/3 mx-auto h-3/4 mb-4 border-2 border-primary rounded-md'>
            <div className='flex flex-col items-center p-4 my-6'>
                <h2 className='text-xl font-bold text-primary my-4'>General Information</h2>
                <div className='mx-auto'>
                    <h3 className='text-left text-primary text-lg'>Average Weekly Income: ${average_weekly_income}</h3>
                    <h3 className='text-left text-primary text-lg '>Average Monthly Expenses: ${average_monthly_expenses}</h3>
                    {positiveBalance && <h3 className={`text-left text-primary text-lg ${positiveBalance && 'text-green-500 font-bold'}`}>Currently beyond exenses by: ${positiveBalance}</h3>}
                </div>
            </div>
            <table className='mx-auto w-4/5'>
                <thead>
                    <tr>
                    <th></th>
                    <th className={tailwindCSSHead}>Income for the Week</th>
                    <th className={tailwindCSSHead}>Current Monthly Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={tailwindCSSCell}>Week 1:</td>
                        <td className={tailwindCSSCell}>${user.income.week1}</td>
                        <td className={tailwindCSSCell}>${setNumber(average_monthly_expenses - user.income.week1)}</td>
                    </tr>
                    <tr>
                        <td className={tailwindCSSCell}>Week 2:</td>
                        <td className={tailwindCSSCell}>${user.income.week2}</td>
                        <td className={tailwindCSSCell}>${setNumber(average_monthly_expenses - user.income.week1 - user.income.week2)}</td>
                    </tr>
                    <tr>
                        <td className={tailwindCSSCell}>Week 3:</td>
                        <td className={tailwindCSSCell}>${user.income.week3}</td>
                        <td className={tailwindCSSCell}>${setNumber(average_monthly_expenses - user.income.week1 - user.income.week2 - user.income.week3)}</td>
                    </tr>
                    <tr>
                        <td className={tailwindCSSCell}>Week 4:</td>
                        <td className={tailwindCSSCell}>${user.income.week4}</td>
                        <td className={tailwindCSSCell}>${setNumber(average_monthly_expenses - user.income.week1 - user.income.week2 - user.income.week3 - user.income.week4)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Profile