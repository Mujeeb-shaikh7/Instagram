import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { storage, db } from './firebase';
import { serverTimestamp } from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';

function ImageUpload({ username }) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = (e) => {
    if (!image) {
      alert('Please choose a file first!');
      return;
    }
  
    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
  
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress); // Update progress state here
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          db.collection('posts')
            .add({
              timestamp: serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            })
            .then(() => {
              setCaption('');
              setProgress(0);
              setImage(null);
            })
            .catch((error) => {
              console.error('Error adding post to database: ', error);
            });
        });
      }
    );
  };
  

  return (
    <div className='image_upload'>
      <progress value={progress} max='100'></progress>
      <input className='content' type='text' placeholder='Enter a caption' onChange={(event) => setCaption(event.target.value)} value={caption} />
      <div>
        <input className='file' type='file' onChange={handleChange} />
        <Button onClick={handleUpload}> {/* Removed parentheses here */}
          upload
        </Button>
      </div>
      <p>{progress} "% done"</p>
    </div>
  );
}

export default ImageUpload;
