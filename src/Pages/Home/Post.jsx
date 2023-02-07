import React from 'react'

const Post = (props) => {
  return (
    <div className='bdr'>{console.log(props.post)}
      <h1 className='heading'> title {props.post.title} </h1>
      <p className='description '> description{props.post.description} </p>
      <div className='user-name'>posted by-@{props.post.username}</div>

    <button>Like </button>
    
    </div>
  )
}

export default Post
