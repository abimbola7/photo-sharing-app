"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from "yup"
import { IoCloudUploadOutline } from "react-icons/io5";
import { Button } from '@/components/ui/button'
import { X } from "lucide-react"
import { useSession } from 'next-auth/react';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { storage } from '../../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { Montserrat } from 'next/font/google'


const montserrat = Montserrat({ subsets: ['latin'] })

const SignupSchema = Yup.object().shape({
  title : Yup.string()
  .required('Required!'),
  content : Yup.string()
  .required("Required!")
})


const ImageForm = ({ categories }) => {
  const router = useRouter()
  const { data }  = useSession();
  const filePickerRef = React.useRef(null)
  const [ category, setCategory ] = React.useState([]);
  const [ selectedFile, setSelectedFile ] = React.useState(null);
  const [ tags, setTags ] = React.useState([])
  const [ value, setValue ] = React.useState("");
  const [ loading, setLoading ] = React.useState(false);

  const tagHandler = (e) => {
    console.log(e.key)
    if (e.key === "," || e.key === " "){
      if (value.trim() === "") return
      const pickedTag = tags.find(tag=>tag === value.trim())
      if (pickedTag) return
      setTags([...tags, value.trim()])
      setValue("")
    }
  }

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
      onSubmit={ async (values) => {
        let downloadURL;
        try {
          if (loading) return;
          setLoading(true);
          const imageRef = ref(storage, `posts/${uuidv4()}/images`);
          await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {
            console.log(snapshot)
            downloadURL = await getDownloadURL(imageRef);
            // console.log(downloadURL)
            // setAvatarUrl(downloadURL)
          })
        } catch (error) {
          throw new Error("Problem uploading image")
        }     
        
        setLoading(false);
        const post = {
          author : { avatar : data?.user?.image, username : data?.user?.username},
          title : values.title,
          content : values.content,
          category : category,
          image : downloadURL,
          tags : tags,
          createdAt : new Date()
        }
        console.log(post, downloadURL)
        try {
          const res = await fetch("/api/posts", {
            method : "POST",
            headers : {
              "Content-Type" : "application/json"
            },
            body : JSON.stringify({
              post
            })
          })
          if (res.ok) {
            console.log("okay");
            router.push("/")
          } else {
            throw new Error("JAJAJAJAJAJAJAJAJA")
          }
        }catch(error){
          console.log(error)
        }
      }}
      >
        {({ errors, touched, isSubmitting, values }) => (
         <Form className='flex flex-col space-y-3'>
          <div>
            <label className='font-semibold uppercase'>Title</label>
            <Field name="title"  className="image"/>
            {errors.title && touched.title ? (
              <div className='text-red-700'>{errors.title}</div>
            ) : null}
          </div> 
          
          <p className="text-center text-xl mt-2">Select Categories</p>
          <div className="grid w-full sm:grid-cols-2 md:grid-cols-3 gap-10 p-5 my-2 rounded-md py-8 bg-ghost">
            {
              categories.cat && categories.cat.map(categories=>(
                <div 
                className={`py-2 px-5 text-center rounded-full cursor-pointer ${montserrat.className} bg-accent ${category.includes(categories.name) && "bg-green-500"}  transition-colors duration-500`}
                key={categories._id}
                onClick={()=>handleCategory(categories.name)}
                >
                    <p className='select-none p'>{ categories.name }</p>
                </div>
              ))
            }
          </div>
          
          <div>
           <label className="font-semibold uppercase">Content</label>
           <Field name="content" className="image" as="textarea" rows="6" />
           {errors.content && touched.content ? (
             <div className='text-red-700'>{errors.content}</div>
           ) : null}
          </div>

          <div className='mb-10'>
            <h2 className='mb-2 font-semibold uppercase'>Add Image</h2>
            <div className='w-full h-[30rem] border border-dashed border-destructive p-1'>
              {
                !selectedFile ? (
                  <div className='flex flex-col items-center justify-center w-full h-full space-y-3'>
                    <IoCloudUploadOutline className='text-7xl'/>
                    <Button
                    type="button"
                    onClick={()=>filePickerRef.current.click()}
                    className="text-white bg-destructive text-primary hover:bg-destructive">
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
                className="mt-2 text-primary bg-destructive hover:bg-destructive">Remove Image</Button>
              )
            }
          </div>
          <div className=''>
          <h1 className='font-semibold'>TAGS</h1>
          <div className='flex items-center w-full px-1 py-1 mb-20 overflow-x-auto border rounded-lg'>
            <div className='flex flex-row items-center space-x-2'>
              {
                tags.map(tag=>(
                  <div className='flex items-center px-2 mr-1 space-x-2 rounded-md bg-ghost' key={tag}>
                    <span className='mr-2'>{tag}</span>
                    <Button 
                    asChild 
                    variant="ghost" 
                    size="icon" 
                    className="w-2 cursor-pointer"
                    onClick={()=>setTags(tags.filter(t=>t!==tag))}
                    >
                      <X className="w-6 h-4 p-1 bg-destructive hover:bg-destructive"/>
                    </Button>
                  </div> 
                ))
              }
              <input 
              placeholder='Enter Tags'
                className="flex-1 px-2 py-1 bg-transparent focus:outline-none"
              value={value}
              onChange={(e)=>setValue(e.target.value)}
              onKeyDown={tagHandler}
              />
            </div>
          </div>
        </div>
        <button type="submit"  className='w-full py-2 mt-2 text-center text-white rounded-md bg-destructive focus:outline-none disabled:bg-green-300'>Upload</button>
        </Form>
        )}
      </Formik>
    </div>
  )
}

export default ImageForm