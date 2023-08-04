import React from 'react'
import Avatar from '@mui/material/Avatar';
function Post() {
  return (
    <div className='Post'>
     <div className='post_header'>
        <Avatar 
            className='post_avatar'
            alt='mujeeb'
            src=''
         />
        <h3>User Name</h3>
      </div>
    
        <img className='post_image' alt='' src="https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png"/>
        <h4 className='post_text'><strong>Mujeeb</strong> This is my first post</h4>
    </div>
  )
}

export default Post