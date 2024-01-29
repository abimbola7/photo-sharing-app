"use client"
import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from "yup"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CiCamera } from "react-icons/ci";
import { storage } from '../../../../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid';

const passwordValidator = (message) => {
  return `Your password must have at least 1 ${message} character.`
}


const SignupSchema = Yup.object().shape({
  username : Yup.string()
  .min(6, 'Username must be 6 character or more!')
  .max(50, 'Too long!')
  .required('Required!'),
  email : Yup.string().email('Invalid Email').required("Required"),
  password : Yup.string().required("Please enter your password")
  .min(8, "Password must have at least 8 characters")
  .matches(/[0-9]/, passwordValidator("digit"))
  .matches(/[a-z]/, passwordValidator("lowercase"))
  .matches(/[A-Z]/, passwordValidator("uppercase")),
  confirmPassword : Yup.string()
  .required("Please re-type your password")
  .oneOf([Yup.ref("password")], "Passwords do not match")
})


const RegisterForm = () => {
  const filePickerRef = React.useRef(null);
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ loading, setLoading ] = React.useState(false)
  const [ avatarUrl, setAvatarUrl ] = React.useState(null)
  const router = useRouter();
  const [ error, setError ] = React.useState(null)
  const addImageToPost = (e) => {
    console.log(e.target.files[0])
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)

    }
  }

  return ( 
    <div className='mx-auto w-[40rem] max-w-[90%] mt-10'>
      <h1 className='mb-5 text-5xl text-center u)ppercase'>Sign Up</h1>
      {
        selectedFile ? (
          <div className='flex items-center justify-center'>
            <div className='relative overflow-hidden w-fit group'>
              <div className="absolute w-full h-full hidden group-hover:flex items-center justify-center z-[10000] pointer-events-none text-center text-sm text-red-500">
                Tap to remove image
              </div>
              {
                loading && (
                  <div className="absolute w-full h-full flex items-center justify-center z-[10000] pointer-events-none text-center text-sm text-red-500">
                    <img src="/loader.svg"/>
                  </div>
                )
              }

              <img 
              onClick={()=>setSelectedFile(null)}
              src={selectedFile} 
              alt="" 
              className='object-contain object-cover object-center w-32 h-32 transition-transform duration-300 rounded-full cursor-pointer group-hover:scale-110 brightness-100 hover:brightness-50'
              />
            </div>
            {/* <Button 
            onClick={uploadToFirebase}
            className="ml-2 bg-destructive text-primary hover:bg-none">
              Click to verify image
            </Button> */}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <div onClick={()=>filePickerRef.current.click()} className='p-2 rounded-full cursor-pointer bg-secondary'>
              <CiCamera className='text-4xl' />
            </div>
            {
              !selectedFile && <p>Select an Image</p>
            }
            <div className="mt-2">
              <input
                type="file"
                hidden
                ref={filePickerRef}
                onChange={addImageToPost}
              />
            </div>
          </div>
        )
      }
      <Formik
      initialValues={{
        username : "",
        email : "",
        password : "",
        confirmPassword : ""
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        console.log(values)
        setError(null)
        try {
          const user = {
            email : values.email.trim(),
            username : values.username.trim()
          }
          const resUserExists = await fetch("/api/userexists", {
            method : "POST",
            headers : {
              "Content-Type" : "application/json"
            },
            body : JSON.stringify({user})
          })
          const { errors, message } = await resUserExists.json()
          console.log(errors, message);
          if (errors.username || errors.email) {
            setError(`${ errors.username || errors.email }`)
            return;
          }
        } catch (error){
          console.log(error, "registerform")
        }
        let downloadURL;
        try {
          if (loading) return;
          setLoading(true);
          const imageRef = ref(storage, `avatars/${uuidv4()}/images`);
          await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {
            console.log(snapshot)
            downloadURL = await getDownloadURL(imageRef);
            console.log(downloadURL)
            setAvatarUrl(downloadURL)
          })
        } catch (error) {
          throw new Error("Problem uploading image")
        }     
        
        setLoading(false);

        try {
          console.log(downloadURL)
          const res  = await fetch("/api/register", {
            method : "POST",
            headers : {
              "Content-Type" : "application/json"
            },
            body : JSON.stringify({
              avatar : downloadURL,
              username : values.username,
              email : values.email,
              password : values.password
            })
          })
          if (res.ok) {
            console.log("okay")
            router.replace("/auth/signin") 
          }
        } catch(err) {
          console.error(err, "PROBLEM FROM REGISTER")
        }
      }}
      >
        {({ errors, touched, isSubmitting, values }) => (
         <Form className='flex flex-col space-y-3'>
          <div>
            <label>Username</label>
            <Field name="username"  className="forms"/>
            {errors.username && touched.username ? (
              <div className='text-red-700'>{errors.username}</div>
            ) : null}
          </div>
          <div>
           <label>Email</label>
           <Field name="email" type="email" className="forms"/>
           {errors.email && touched.email ? <div className='text-red-700'>{errors.email}</div> : null}
          </div>
          <div>
           <label>Password</label>
           <Field name="password" type="password" className="forms"/>
           {errors.password && touched.password ? <div className='text-red-700'>{errors.password}</div> : null}
          </div>
          <div>
           <label>Confirm Password</label>
           <Field name="confirmPassword" type="password" className="forms"/>
           {errors.confirmPassword && touched.confirmPassword ? <div className='text-red-700'>{errors.confirmPassword}</div> : null}
          </div>
          {
            error && <p className='text-red-500'>{ error }</p>
          }
           <button type="submit" disabled={isSubmitting}  className='w-full py-2 mt-2 text-center text-white rounded-md bg-destructive focus:outline-none disabled:bg-destructive/50'>Submit</button>
           <p className='tect-center'>
            Already have an account? <Link href={"/auth/signin"} className='text-green-500'>Login</Link>
           </p>
         </Form>
       )}
      </Formik>
    </div>
  )
}

export default RegisterForm