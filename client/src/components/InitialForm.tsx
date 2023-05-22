import { useFormik } from 'formik';
import * as yup from "yup";
import { useState } from 'react';
import { useUserContext } from './UserContext';

type InitialFormProps = {
    userID: number;
};

const InitialForm: React.FC<InitialFormProps> = ({userID}) => {
    const [errorMessage, setErrorMessage] = useState<string>('')

    const { updateUser } = useUserContext()

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
                    res.json().then(data => updateUser(data))
                } else res.json().then(data => setErrorMessage(data.error))
            })
        }
    })
    

    return (
        <div>
            <h1>Welcome!</h1>
            <p>This form is to get you started on some basic budgeting. Don't overthink it. Just put in general amounts. If you need to update this later, you always can.</p>
            <form onSubmit={formik.handleSubmit}>
                <label>Average Weekly Net Income (what you take home)</label>
                <input name='average_weekly_income' value={formik.values.average_weekly_income} onChange={formik.handleChange} type='text' placeholder='Ex. 700' />
                <br />
                <p style={{color: "red"}}>{formik.errors.average_weekly_income}</p>
                <br />
                <label>Average Monthly Expenses</label>
                <input name='average_monthly_expenses' value={formik.values.average_monthly_expenses} onChange={formik.handleChange} type='text' placeholder='Ex 1700' />
                <br />
                <p style={{color: "red"}}>{formik.errors.average_monthly_expenses}</p>
                <br />
                <input type="submit" />
                {errorMessage && <p style={{color: "red"}} >{errorMessage}</p>}
            </form>
        </div>
    )
}
export default InitialForm