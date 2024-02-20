"use client"

import React from 'react'
import * as Yup from "yup"
import { Formik, Form, Field } from 'formik';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const loginSchema = Yup.object().shape({
  email : Yup.string().email('Invalid Email').required("Required"),
  password : Yup.string().required("Please enter your password")
})


const LoginForm = () => {
  const [ inputType, setInputType ] = React.useState("password")
  const router  = useRouter()
  const [ error, setError ] = React.useState(null);
  const handlePassword = () => {
    inputType === "password" ? setInputType("text") : setInputType("password")
  }
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
        // console.log(values)
        const email = values.email
        const password = values.password
        try {
          const res = await signIn('credentials', {
          email, password , redirect : false
          })
          // console.log(res);
          if (res.error) {
            setError("Invalid credentials")
            return;
          }
          toast('Login Successful!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
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
              <div className=''>
                <label>Password</label>
                <div className="relative">
                  <Field name="password" className="forms relative"  type={inputType}/>
                  <div 
                  className="absolute right-2 top-4 z-[1000]"
                  onClick={handlePassword}
                  >
                    {
                      inputType === "password" ? <FaRegEye className='text-xl cursor-pointer'/> : <FaRegEyeSlash className='text-xl cursor-pointer'/>
                    }
                  </div>
                </div>
                  <>
                    {errors.password && touched.password ? (
                      <div className='text-red-700'>{errors.password}</div>
                    ) : null}
                  </>
              </div>
              {
                error && <p className="text-red-500">{error}</p>
              }
              <button type="submit" disabled={isSubmitting}  className='w-full py-2 mt-2 text-center text-white bg-destructive rounded-md focus:outline-none disabled:bg-destructive/50'>Submit</button>
              <p className='tect-center'>
                Don&apos;t have an account? <Link href="/register" className='text-red-500'>Register</Link>
              </p>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}

export default LoginForm