import React from 'react'
import Avatar from '@mui/material/Avatar';
function Post({username,imageUrl,caption}) {
  return (
    <div className='Post'>
     <div className='post_header'>
        <Avatar 
            className='post_avatar'
            alt={username}
            src=''
         />
        <h3>{username}</h3>
      </div>
    
        <img className='post_image' alt='' src={imageUrl}/>
        <h4 className='post_text'><strong>{username}</strong>{caption}</h4>
    </div>
  )
}

export default Post