import HomePage from './components/Home/HomePage';
import PublicNavbar from './components/Navbar/PublicNavbar';
import CreatePost from './components/Posts/CreatePost'
// import PostDetails from './components/Posts/PostDetails';
import UpdatePost from './components/Posts/UpdatePost';
import PostsList from './components/Posts/PostsList'
import {BrowserRouter,Route,Routes} from "react-router-dom";
import PostDetails from './components/Posts/PostDetails';
function App() {

  return (
    <>
      <BrowserRouter>
      <PublicNavbar/>
      <Routes>
      <Route element={<HomePage/>} path="/"/>
      {/* <Route element={<UpdatePost/>} path="/posts/:postId"/> */}
      <Route element={<PostDetails/>} path="/posts/:postId"/>

        <Route element={<CreatePost/>} path="/create-post"/>
        <Route element={<PostsList/>} path="/posts"/>

      
      </Routes>
      
        </BrowserRouter>
    </>
  )
}

export default App
