"use client"
import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from "yup"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IoCloudUploadOutline } from "react-icons/io5";
import { Button } from '@/components/ui/button'
import Tags from './tags'

const passwordValidator = (message) => {
  return `Your password must have at least 1 ${message} character.`
}


const SignupSchema = Yup.object().shape({
  title : Yup.string()
  .required('Required!'),
  content : Yup.string()
  .required("Required!")
})


const ImageForm = ({ categories }) => {
  const filePickerRef = React.useRef(null)
  const [ category, setCategory ] = React.useState([]);
  const [ tags, setTags ] = React.useState([]);
  const [ selectedFile, setSelectedFile ] = React.useState(null);

  const addImageToPost = (e) => {
    console.log(e.target.files[0])
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }
  
  const handleCategory = (name) => {
    const pickedItem = category.find(item=>item === name)
    if (pickedItem) {
      const filtered = category.filter(item=>item !== name)
      return setCategory(filtered)
    }
    setCategory([...category, name])
  }

  console.log(category);
  
  return (
    <div className='mx-auto w-[50rem] max-w-[90%] mt-10'>
      <Formik
      initialValues={{
        title : "",
        content : ""
      }}
      validationSchema={SignupSchema}
      // onSubmit={}
      >
        {({ errors, touched, isSubmitting, values }) => (
         <Form className='flex flex-col space-y-3'>
          <div>
            <label className='text-gray-400'>Title</label>
            <Field name="title"  className="image"/>
            {errors.title && touched.title ? (
              <div className='text-red-700'>{errors.title}</div>
            ) : null}
          </div> 

          <div className="grid w-full grid-cols-3 gap-10 p-5 my-2 rounded-md py-14 bg-card">
            {
              categories.cat && categories.cat.map(categories=>(
                <div 
                className={`py-2 text-center rounded-full cursor-pointer bg-accent ${category.includes(categories.name) && "bg-green-500"}  transition-colors duration-500`}
                key={categories._id}
                onClick={()=>handleCategory(categories.name)}
                >
                    <p className='select-none p'>{ categories.name }</p>
                </div>
              ))
            }
          </div>
          
          <div>
           <label className="text-gray-400">Content</label>
           <Field name="content" className="image" as="textarea" rows="6" />
           {errors.content && touched.content ? (
             <div className='text-red-700'>{errors.content}</div>
           ) : null}
          </div>

          <div className='flex flex-row w-full py-2 rounded-md'>
            
          </div>
         </Form>
       )}
      </Formik>
      <div className='mb-10'>
        <h2 className='mb-2'>Add Image</h2>
        <div className='w-full h-[30rem] border border-dashed border-destructive p-1'>
          {
            !selectedFile ? (
              <div className='w-full h-full flex items-center justify-center flex-col space-y-3'>
                <IoCloudUploadOutline className='text-7xl'/>
                <Button 
                onClick={()=>filePickerRef.current.click()}
                className="bg-destructive text-primary hover:bg-destructive">
                  Browse Images
                </Button>
                <input type="file" hidden ref={filePickerRef} onChange={addImageToPost}/>
              </div>
            ):(
              <img 
              className='object-cover object-center w-full h-full'
              src={selectedFile}/>
            )
          }
        </div>
        {
          selectedFile && (
            <Button 
            onClick={()=>setSelectedFile(null)}
            className="text-primary bg-destructive hover:bg-destructive mt-2">Remove Image</Button>
          )
        }
      </div>
      <Tags/>
    </div>
  )
}

export default ImageForm