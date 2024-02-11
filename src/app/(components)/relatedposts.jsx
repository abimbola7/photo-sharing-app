import React from 'react'
import { Post as PP } from '../(models)/user'
import Post from './post'

const getRelatedPost = async (categories, id) => {
  try {
    const cat = await PP.find({ 
      "category" : { $in : categories },
      "_id" : { $ne : id }
    }).limit(6);
    return cat
  } catch (error) {
    console.log(error)
  }
}

const RelatedPosts = async ({ categories, id }) => {
  const related = await getRelatedPost(categories, id)
  return (
    <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 py-4 gap-4'>
        {
          related && related.map((post)=>(
            <Post 
            key={post._id} 
            title={post.title} 
            name={post.author.username}
            avatar={post.author.avatar}
            createdAt={post.createdAt} 
            image={post.image}/>
          ))
        }
      </div>
  )
}

export default RelatedPosts