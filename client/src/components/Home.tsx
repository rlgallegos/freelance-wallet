import { useUserContext } from './UserContext';

const Home: React.FC = () => {
    const tailwindCSSCell: string = 'text-primary text-md my-1'

    const { user } = useUserContext()

    const totalIncome: number = user.income.week1 + user.income.week2 + user.income.week3 + user.income.week4

    return (
        <div className="text-center w-full my-4 ">
            <div className='flex flex-col sm:flex-row mx-auto'>
                <div className='flex flex-col w-4/5 sm:w-1/3 mx-auto bg-white bg-opacity-80 p-12 m-4 border-2 border-primary rounded-md'>
                    <h2 className='text-xl font-bold text-primary mb-4'>User Details</h2>
                    <div className='grid grid-cols-2 sm:grid-cols-2 text-left px-4'>
                        <h3 className={tailwindCSSCell}>User:</h3>
                        <p className={tailwindCSSCell}>{user.username}</p>
                        <h3 className={tailwindCSSCell}>Average Weekly Income:</h3>
                        <p className={tailwindCSSCell}>${user.average_weekly_income}</p>
                        <h3 className={tailwindCSSCell}>Average Monthly Expenses:</h3>
                        <p className={tailwindCSSCell}>${user.average_monthly_expenses}</p>
                    </div>
                </div>
                <div className='flex flex-col w-4/5 sm:w-1/3 mx-auto bg-white bg-opacity-80 p-12 m-4 border-2 border-primary rounded-md'>
                    <h2 className='text-xl font-bold text-primary mb-4'>Stats for the Current Month</h2>
                    <div className='grid grid-cols-2 sm:grid-cols-2 text-left px-4'>
                    <h3 className={tailwindCSSCell}>Total Income:</h3>
                        <p className={tailwindCSSCell}>${totalIncome}</p>
                        <h3 className={tailwindCSSCell}>Week 1:</h3>
                        <p className={tailwindCSSCell}>${user.income.week1}</p>
                        <h3 className={tailwindCSSCell}>Week 2:</h3>
                        <p className={tailwindCSSCell}>${user.income.week2}</p>
                        <h3 className={tailwindCSSCell}>Week 3:</h3>
                        <p className={tailwindCSSCell}>${user.income.week3}</p>
                        <h3 className={tailwindCSSCell}>Week 4:</h3>
                        <p className={tailwindCSSCell}>${user.income.week4}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home