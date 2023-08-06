import { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import './Post.css';
import {auth, db} from './firebase'
import { collection, getDocs } from "firebase/firestore"; 
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import ImageUpload from './ImageUpload';
function App() {
  let [posts,setPosts]=useState([])
  const [open, setOpen] = useState(false);
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user,setUser]=useState(null);
  const [openSignIn,setOpenSignIn]=useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',

  };
  
  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
       
        setUser(authUser);
        
      }else{
        setUser(null);
      }
    });

    return ()=>{
      unsubscribe();
    }
  },[user,username])
  
useEffect(()=>{
  async function fetchData(){
    let colRef = collection(db, "posts");
    let docsSnap = await getDocs(colRef);
    try {
     let posts=docsSnap.docs.map((doc)=>{
        
        return {
            id:doc.id,
            ...doc.data()
        }
     });
     setPosts(posts)
    } catch (error) {
        console.log(error);
    }
}
fetchData()
},[])
 let signup=(event)=>{
  event.preventDefault();
  auth
  .createUserWithEmailAndPassword(email,password)
  .then((authUser)=>{
    authUser.user.updateProfile({
      displayName:username
    })
  })
  .catch((error)=>alert(error.message))
  setOpen(signin);
 }
 let signin=(event)=>{
  event.preventDefault();
  auth.signInWithEmailAndPassword(email,password)
  .catch((error)=>alert(error.message))
  setOpenSignIn(false);
 }
  return (
    <div className="App">
     
      <form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter Details
          </Typography>
          <Input 
            type="text"
            placeholder="username"
            value={username}
            onChange={(e)=>setUserName(e.target.value)}
            className='modal_input'
          />
          <Input 
            type="email"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className='modal_input'
          />
          <Input 
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className='modal_input'
          />
            <Button type="submit" onClick={signup}>Sign Up</Button>
        </Box>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter Details
          </Typography>
          
          <Input 
            type="email"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className='modal_input'
          />
          <Input 
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className='modal_input'
          />
            <Button type="submit" onClick={signin}>Sign In</Button>
        </Box>
      </Modal>
      </form>
      
     <div className='app_header'>
      <img
        className='app_headerImage'
        src="https://www.transparentpng.com/thumb/logo-instagram/kuQpOb-logo-instagram-images.png"
         alt="logo"
      />
      {
        user?( <Button onClick={()=>auth.signOut()}>Log out</Button>):( 
          <div>
            <Button onClick={()=>setOpenSignIn(true)}>Log In</Button>
           <Button onClick={handleOpen}>Sign Up</Button>
          </div>
          )
      }
    
     </div>
     <ImageUpload />
     {
      posts.map(post=>
        (
          <Post key={post.id} username={post.username} imageUrl={post.imageUrl} caption={post.caption}/>
        )
      )
     }
   
    </div>
  );
}

export default App;
