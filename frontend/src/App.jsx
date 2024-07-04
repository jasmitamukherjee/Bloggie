import HomePage from './components/Home/HomePage';
import PublicNavbar from './components/Navbar/PublicNavbar';
import CreatePost from './components/Posts/CreatePost'
import UpdatePost from './components/Posts/UpdatePost';
import PostsList from './components/Posts/PostsList'
import {BrowserRouter,Route,Routes} from "react-router-dom";
import PostDetails from './components/Posts/PostDetails';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Profile from './components/User/Profile';
import PrivateNavbar from './components/Navbar/PrivateNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatusAPI } from './APIServices/users/usersAPI';
import { useQuery } from '@tanstack/react-query';
import { isAuthenticated } from './redux/slices/authSlices';
import { useEffect } from 'react';

function App() {
  const {isError, isLoading, data, error, refetch} = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatusAPI
});
const dispatch = useDispatch();
useEffect(()=>{
dispatch(isAuthenticated(data))
},[data])

//get login user from store
const {userAuth}=useSelector((state)=>state.auth)
console.log(userAuth)
  return (
    <>
      <BrowserRouter>
      
      {userAuth?<PrivateNavbar/>:<PublicNavbar/>}
      <Routes>
      <Route element={<HomePage/>} path="/"/>
      {/* <Route element={<UpdatePost/>} path="/posts/:postId"/> */}
      <Route element={<PostDetails/>} path="/posts/:postId"/>

        <Route element={<CreatePost/>} path="/create-post"/>
        <Route element={<PostsList/>} path="/posts"/>
        <Route element={<Login/>} path="/login"/>

        <Route element={<Register/>} path="/register"/>


        <Route element={<Profile/>} path="/profile"/>

      
      </Routes>
      
        </BrowserRouter>
    </>
  )
}

export default App
