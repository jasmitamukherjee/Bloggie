import HomePage from './components/Home/HomePage';
import PublicNavbar from './components/Navbar/PublicNavbar';
import CreatePost from './components/Posts/CreatePost'
import PostDetails from './components/Posts/PostDetails';
import PostsList from './components/PostsList'
import {BrowserRouter,Route,Routes} from "react-router-dom";
function App() {

  return (
    <>
      <BrowserRouter>
      <PublicNavbar/>
      <Routes>
      <Route element={<HomePage/>} path="/"/>
      <Route element={<PostDetails/>} path="/posts/:postId"/>

        <Route element={<CreatePost/>} path="/create-post"/>
        <Route element={<PostsList/>} path="/lists"/>

      
      </Routes>
      
        </BrowserRouter>
    </>
  )
}

export default App
