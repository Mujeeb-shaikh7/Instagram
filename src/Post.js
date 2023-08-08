import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { db } from './firebase';
import { serverTimestamp } from 'firebase/firestore';
function Post({postId,user,username,imageUrl,caption}) {
  const [comments,setComments]=useState([]);
  const [comment,setComment]=useState('')
  useEffect(()=>{
    let unsubscribe;
    if(postId){
      unsubscribe=db
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .onSnapshot((snapshot)=>{
        setComments(snapshot.docs.map((doc)=>doc.data()));
      });
    }
  },[postId]);
  const postComment=(event)=>{
      event.preventDefault();

      db.collection('posts').doc(postId).collection('comments').add({
        comment:comment,
        username:user.displayName,
        timestamp: serverTimestamp
      });
      setComment('')
  }
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
        <div className='post_comments'>
  {comments.map((comment) => (
    <p key={comment.id}>
      <strong>{comment.username}</strong> {comment.comment}
      
    </p>
   
  ))}
</div>
{user&&(<form className='post_commentBox'>
          <input 
            className='post_input'
            type='text'
            placeholder='add comment'
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
          />
          <button
           className='post_button'
           disabled={!comment}
           type='submit'
           onClick={postComment}
          >
post
          </button>
        </form>)}
        
    </div>
  )
}

export default Post