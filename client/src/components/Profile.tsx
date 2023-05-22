import { useEffect, useState } from 'react';
import { useUserContext } from './UserContext';

const Profile: React.FC = () => {
    const [positiveBalance, setPositiveBalance] = useState<number>(0)

    const { user } = useUserContext()
    const { average_monthly_expenses, average_weekly_income } = user

    //Calculate Positive balance
    useEffect(() => {
        let incomeArray = [user.income.week1, user.income.week2, user.income.week3, user.income.week4]
        console.log(incomeArray)
        setPositiveBalance( (average_monthly_expenses - (incomeArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0))) *-1 )
    }, [user])


    const setNumber = (num: number): number => {
        if (num < 0){
            return 0
        } else {
            return num
        }
    }

    console.log(positiveBalance)

    return (
        <div>
            <h3>Average Weekly Income: ${average_weekly_income}</h3>
            <h3>Average Monthly Expenses: ${average_monthly_expenses}</h3>
            {positiveBalance && <h3>Currently over exenses by: ${positiveBalance}</h3>}
            <table>
                <thead>
                    <tr>
                    <th></th>
                    <th>Income for the Week</th>
                    <th>Current Monthly Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Week 1:</td>
                    <td>${user.income.week1}</td>
                    <td>${setNumber(average_monthly_expenses - user.income.week1)}</td>
                    </tr>
                    <tr>
                    <td>Week 2:</td>
                    <td>${user.income.week2}</td>
                    <td>${setNumber(average_monthly_expenses - user.income.week1 - user.income.week2)}</td>
                    </tr>
                    <tr>
                    <td>Week 3:</td>
                    <td>${user.income.week3}</td>
                    <td>${setNumber(average_monthly_expenses - user.income.week1 - user.income.week2 - user.income.week3)}</td>
                    </tr>
                    <tr>
                    <td>Week 4:</td>
                    <td>${user.income.week4}</td>
                    <td>${setNumber(average_monthly_expenses - user.income.week1 - user.income.week2 - user.income.week3 - user.income.week4)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Profile