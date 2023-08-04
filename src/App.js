import { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import './Post.css';
import {db} from './firebase'
import { collection, getDocs } from "firebase/firestore"; 
function App() {
  let [posts,setPosts]=useState([])
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
  return (
    <div className="App">
     <div className='app_header'>
      <img
        className='app_headerImage'
        src="https://www.transparentpng.com/thumb/logo-instagram/kuQpOb-logo-instagram-images.png"
         alt="logo"
      />
     </div>
     {
      posts.map(post=>
        (
          <Post username={post.username} imageUrl={post.imageUrl} caption={post.caption}/>
        )
      )
     }
    {/* <Post username='mujeeb' imageUrl='https://w7.pngwing.com/pngs/799/987/png-transparent-computer-icons-avatar-social-media-blog-font-awesome-avatar-heroes-computer-wallpaper-social-media.png' caption="cool my post"/>
    <Post username='mujeeb' imageUrl='https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-01.jpg' caption="cool my post"/>
    <Post username='mujeeb' imageUrl='https://assets-prd.ignimgs.com/2021/09/14/lostinrandom-blogroll-01-1631659942612.jpg' caption="cool my post"/> */}
    
    </div>
  );
}

export default App;
