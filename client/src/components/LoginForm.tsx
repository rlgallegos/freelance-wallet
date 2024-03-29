import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState<string>('')

    //Formik Schema Logic
    const formSchema = yup.object().shape({
      password: yup.string().required("Must enter a password").max(15),
      username: yup.string().required("Must enter a username").max(15)
      });


  //Formik Logic
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: values => {
            fetch(process.env.REACT_APP_API_URL + '/login', {
                method: 'POST',
                credentials: 'include',
                headers:  {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            .then(res => {
                if (res.ok){
                navigate('/')
                } else res.json().then(data => setErrorMessage(data.error))
            })
        }
    })



  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
            <input name='username' value={formik.values.username} onChange={formik.handleChange} type='text' placeholder='Enter username' className='border-2 border-secondary my-2 px-1' />
                <p style={{color: "red"}}>{formik.errors.username}</p>
                <input name='password' value={formik.values.password} onChange={formik.handleChange} type='password' placeholder='Enter password' className='border-2 border-secondary my-2 px-1' />
                <p style={{color: "red"}}>{formik.errors.password}</p>
            <input className='clickable mx-auto py-1 px-3 text-center text-primary border border-primary hover:bg-secondary bg-opacity-80 rounded-lg my-1' type="submit" value="Login" />
            {errorMessage && <p style={{color: "red"}} >{errorMessage}</p>}
        </form>
    </div>
  )
}
export default LoginForm