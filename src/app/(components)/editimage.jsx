"use client"
import { Button } from '@/components/ui/button'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import React from 'react'
import { storage } from '../../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const EditImage = ({ avatar, name }) => {
  const router  = useRouter()
  const { data } = useSession()
  const filePickerRef = React.useRef(null)
  const [ isLoading, setIsLoading ] = React.useState(false) 
  const [ selectedImage, setSelectedImage ] = React.useState(null)
  const [ fetchedAvatar, setFetchedAvatar ] = React.useState(null) 
  
  const fetchAvatar = async () => {
    const res = await fetch(`/api/image/${name}`)
    if (res.ok) {
      // console.log("okay")
      let { avatar } = await res.json()
      setFetchedAvatar(avatar.avatar)
      // console.log(avatar)
    }
  }

  const handleImage = (e) => {
    // console.log("jajajaja")
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = async (readerEvent) => {
      let selectedFile
      setSelectedImage(readerEvent.target.result)
      selectedFile = readerEvent.target.result 
      // console.log(selectedFile)
      let downloadURL
      try {
        if (isLoading) return;
        setIsLoading(true);
        const imageRef = ref(storage, `avatar/${uuidv4()}/images`);
        await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {
          downloadURL = await getDownloadURL(imageRef);
          // console.log(downloadURL)
        })
      } catch (error) {
        throw new Error("Problem uploading image")
      }

      const res = await fetch(`/api/image/${data?.user?.id}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          image : downloadURL,
          username : name
        })
      })
      if (res.ok) {
        // console.log("delete okay")
      }
      fetchAvatar()
      setIsLoading(false)
      router.refresh()
    }
  }

  React.useEffect(() => {
    fetchAvatar()
  }, [])
  return (
    <div className='flex flex-col space-y-2 relative'>
      {
        isLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-50">
            <img  src='/loader.svg' className='w-20 h-20'/>
          </div>
        )
      }
      <img src={ fetchedAvatar } alt={"img"} className={`w-36 h-36 md:w-48 md:h-48 rounded-full p-[1.5px] border-[2px] border-red-500 object-cover transition-transform  duration-200 ease-out ${ isLoading && "brightness-50" }`}/>
      {
        data?.user?.username === name && (
          <Button 
          variant="outline"
          size="sm"
          onClick={()=>filePickerRef.current.click()}
          >
            Edit Image
          </Button>
        )
      }
      <input type="file" hidden ref={filePickerRef} onChange={handleImage} />
    </div>
  )
}

export default EditImage