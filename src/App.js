
import './App.css';
import Post from './Post';
import './Post.css'
function App() {
  return (
    <div className="App">
     <div className='app_header'>
      <img
        className='app_headerImage'
        src="https://www.transparentpng.com/thumb/logo-instagram/kuQpOb-logo-instagram-images.png"
         alt="logo"
      />
     </div>
    <Post />
    <Post />
    <Post />
    <Post />
    </div>
  );
}

export default App;
