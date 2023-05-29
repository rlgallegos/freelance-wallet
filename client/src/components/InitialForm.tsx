import { useFormik } from 'formik';
import * as yup from "yup";
import { useState } from 'react';
import { useUserContext } from './UserContext';

type InitialFormProps = {
    userID: number;
    // setIsBlurry: React.Dispatch<React.SetStateAction<boolean>>;
};

const InitialForm: React.FC<InitialFormProps> = ({userID}) => {
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isBlurry, setIsBlurry] = useState<boolean>(false)

    const { updateUser, user } = useUserContext()

    // Function to just generate number field (for scalability this is quicker)
    const generateNumberFieldSchema = () =>
    yup
      .string()
      .transform((value, originalValue) => {
        // Remove commas and currency symbols from the original value
        return typeof originalValue === 'string'
          ? originalValue.replace(/[$,]/g, '')
          : originalValue;
      })
      .test('valid-number', 'Please enter a valid number', (value) => {
        // Check if the transformed value is a valid number and a whole number
        const parsedNumber = Number(value);
        return !isNaN(parsedNumber) && Number.isInteger(parsedNumber);
      })
      .required('Number is required')
      .typeError('Please enter a valid number');

    //Formik Schema Logic
    const formSchema = yup.object().shape({
        average_weekly_income: generateNumberFieldSchema(),
        average_monthly_expenses: generateNumberFieldSchema()
      });

    //Formik Logic
    const formik = useFormik({
        initialValues: {
            average_weekly_income: '',
            average_monthly_expenses: ''
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: values => {
            fetch(`/users/${userID}`, {
                method: 'PATCH',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            .then(res => {
                if (res.ok){
                    res.json().then(data => updateUser(data)).then(() => setIsBlurry(false))
                } else res.json().then(data => setErrorMessage(data.error))
            })
        }
    })
    

    return (
        <div className={`backdrop w-screen h-screen fixed z-40 ${(isBlurry || !user.initialized) && 'fixed inset-0 bg-opacity-50 backdrop-filter backdrop-blur'} `}>
            <div className="popup flex flex-col items-center p-4 w-5/6 lg:w-1/2 h-[75vh] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white fixed z-50 border border-primary overflow-scroll">
                <h1 className="text-2xl text-primary text-center my-2">Welcome!</h1>
                <p className='text-primary mx-4 text-justify my-4' >This form is to get you started on some basic budgeting. Don't overthink it. Just put in general amounts. If you need to update this later, you always can.</p>
                <div className='flex flex-col h-full items-center justify-center w-full' >
                    <form onSubmit={formik.handleSubmit} className='mx-auto text-center border border-primary w-4/5 my-4 rounded-sm p-4 flex flex-col'>
                        <div className='flex flex-col my-4 md:grid md:grid-cols-2 '>
                            <label className='text-primary text-left pr-2'>Average Weekly Net Income (take home):</label>
                            <input name='average_weekly_income' value={formik.values.average_weekly_income} onChange={formik.handleChange} type='text' placeholder='Ex. 700' className='border-2 border-secondary my-2 px-1 w-full md:w-4/5 mx-auto' />
                            <p style={{color: "red"}}>{formik.errors.average_weekly_income}</p>
                        </div>
                        <div className='flex flex-col my-4 md:grid md:grid-cols-2 '>
                            <label className='text-primary text-left pr-2'>Average Monthly Expenses:</label>
                            <input name='average_monthly_expenses' value={formik.values.average_monthly_expenses} onChange={formik.handleChange} type='text' placeholder='Ex 1700' className='border-2 border-secondary my-2 px-1 w-full md:w-4/5 mx-auto' />
                            <p style={{color: "red"}}>{formik.errors.average_monthly_expenses}</p>
                        </div>
                        <input type="submit" className='col-span-2 clickable mx-auto py-1 px-3 text-center text-primary border border-primary hover:bg-secondary bg-opacity-80 rounded-lg my-1' />
                        {errorMessage && <p style={{color: "red"}} >{errorMessage}</p>}
                    </form>
                </div>

            </div>
        </div>
    )
}
export default InitialForm