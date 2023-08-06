import React,{useState} from 'react'
import Button from '@mui/material/Button';
function ImageUpload() {
    const [caption,setCaption]=useState('')
    const [image,setImage]=useState('');
    const [progress,setProgress]=useState(0);
    const handleChange=(e)=>{
        if(e.target.file[0]){
            setImage(e.target.file[0])
        }
    }
    const handleUpload=(e)=>{
        
    }
  return (
    <div>
        <input type='text' placeholder='Enter a caption' onChange={(event)=>setCaption(event.target.value)} value={caption}/>
        <input type='file'onChange={handleChange}/>
        <Button onClick={handleUpload}>
            upload
        </Button>
    </div>
  )
}

export default ImageUpload