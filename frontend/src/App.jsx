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
import AuthRoute from './components/AuthRoute/AuthRoute';
import UserDashbaord from './components/User/UserDashboard';
import AccountSummaryDashboard from './components/User/AccountSummaryDashboard';
import AddCategory from './components/Category/AddCategory';
import CreatePlan from './components/Plans/CreatePlan';
import Pricing from './components/Plans/Pricing';
import CheckoutForm from './components/Plans/ChekoutForm';
import PaymentSuccess from './components/Plans/PaymentSuccess';
import PayingFreePlan from './components/Plans/PayingFreePlan';
import AccountVerifiedComponent from './components/User/AccountVerification';
import Rankings from './components/User/Rankings';
import Notifications from './components/Notification/Notifications';

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
  return (
    <>
      <BrowserRouter>
      
      {userAuth?<PrivateNavbar/>:<PublicNavbar/>}
      <Routes>
      <Route element={<HomePage/>} path="/"/>
      {/* <Route element={<UpdatePost/>} path="/posts/:postId"/> */}
      <Route element={<PostDetails/>} path="/posts/:postId"/>

        
        <Route element={<PostsList/>} path="/posts"/>
        <Route element={<Login/>} path="/login"/>
        <Route element={<UserDashbaord/>

     } path="/dashboard">
      <Route element={<AuthRoute>
          <CreatePost/>
        </AuthRoute>} path="create-post"/>
        <Route element={<AuthRoute>
          <AccountSummaryDashboard/>
        </AuthRoute>} path=""/>

        <Route element={<AuthRoute>
          <AddCategory/>
        </AuthRoute>} path="add-category"/>

        <Route element={<AuthRoute>
          <CreatePlan/>
        </AuthRoute>} path="create-plan"/>

        
        <Route element={<AuthRoute>
          <Notifications/>
        </AuthRoute>} path="notifications"/>
        
        <Route element={<AuthRoute>
          <AccountVerifiedComponent/>
        </AuthRoute>} path="account-verification/:verifyToken"/>

     </Route>

        <Route element={<Register/>} path="/register"/>


        <Route element={<AuthRoute>
          <Profile/>
        </AuthRoute>} path="/profile"/>

        <Route element={<Pricing/>} path="/pricing"/>

        <Route element={<CheckoutForm/>} path="/checkout/:planId"/>
        <Route element={<AuthRoute>
          <PaymentSuccess/>
        </AuthRoute>} path="/success"/>

        <Route element={<AuthRoute>
          <PayingFreePlan/>
        </AuthRoute>} path="/free-subscription"/>

        <Route element={<Rankings/>} path="/rankings"/>

      </Routes>
      
        </BrowserRouter>
    </>
  )
}

export default App




