"use client"

import React from 'react'
import * as Yup from "yup"
import { Formik, Form, Field } from 'formik';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';

const loginSchema = Yup.object().shape({
  email : Yup.string().email('Invalid Email').required("Required"),
  password : Yup.string().required("Please enter your password")
})


const LoginForm = () => {
  const router  = useRouter()
  const [ error, setError ] = React.useState(null);
  return (
    <div
    className='mx-auto w-[40rem] max-w-[90%] mt-10'
    >
      <h1 className='text-center uppercase text-5xl mb-5'>Login</h1>
      <Formik
      initialValues={{
        email : "",
        password : "",
      }}
      validationSchema={loginSchema}
      onSubmit={async (values) => {
        setError(null)
        console.log(values)
        const email = values.email
        const password = values.password
        try {
          const res = await signIn('credentials', {
          email, password , redirect : false
          })
          console.log(res);
          if (res.error) {
            setError("Invalid credentials")
            return;
          }
          router.push("/");
        } catch(error) {
          console.log("error in the loginform", error)
        }
      }}
      >
        {
          ({ errors, isSubmitting, touched, values })=>(
            <Form
            className='flex flex-col space-y-3'
            >
              <div>
                <label>Email</label>
                <Field name="email"  className="forms"/>
                {errors.email && touched.email ? (
                  <div className='text-red-700'>{errors.email}</div>
                ) : null}
              </div>
              <div>
                <label>Password</label>
                <Field name="password"  className="forms"  type="password"/>
                {errors.password && touched.password ? (
                  <div className='text-red-700'>{errors.password}</div>
                ) : null}
              </div>
              {
                error && <p className="text-red-500">{error}</p>
              }
              <button type="submit" disabled={isSubmitting}  className='w-full py-2 mt-2 text-center text-white bg-destructive rounded-md focus:outline-none disabled:bg-destructive/50'>Submit</button>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}

export default LoginForm