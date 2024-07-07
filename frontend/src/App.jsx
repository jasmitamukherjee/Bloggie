import HomePage from './components/Home/HomePage';
import PublicNavbar from './components/Navbar/PublicNavbar';
import CreatePost from './components/Posts/CreatePost';
import UpdatePost from './components/Posts/UpdatePost';
import PostsList from './components/Posts/PostsList';
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import UserDashboard from './components/User/UserDashboard';
import AccountSummaryDashboard from './components/User/AccountSummaryDashboard';
import AddCategory from './components/Category/AddCategory';
import CreatePlan from './components/Plans/CreatePlan';
import Pricing from './components/Plans/Pricing';
import CheckoutForm from './components/Plans/CheckoutForm';
import PaymentSuccess from './components/Plans/PaymentSuccess';
import PayingFreePlan from './components/Plans/PayingFreePlan';
import AccountVerifiedComponent from './components/User/AccountVerification';
import Rankings from './components/User/Rankings';
import Notifications from './components/Notification/Notifications';
import MyFollowing from './components/User/MyFollowing';
import MyFollowers from './components/User/MyFollowers';
import MyEarnings from './components/User/MyEarnings';
import DashboardPosts from './components/User/DashboardPosts';
import Settings from './components/User/Settings';
import AddEmailComponent from './components/User/UpdateEmail';
import UploadProfilePic from './components/User/UpdateProfilePicture';

function App() {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state.auth);

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatusAPI,
    onSuccess: (data) => {
      dispatch(isAuthenticated(data));
    },
    onError: (error) => {
      dispatch(isAuthenticated(null));
    },
  });

  useEffect(() => {
    if (data) {
      dispatch(isAuthenticated(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <BrowserRouter>
      {userAuth ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<PostDetails />} path="/posts/:postId" />
        <Route element={<PostsList />} path="/posts" />
        <Route element={<Login />} path="/login" />
        <Route element={<UserDashboard />} path="/dashboard">
          <Route element={<AuthRoute><CreatePost /></AuthRoute>} path="create-post" />
          <Route element={<AuthRoute><AccountSummaryDashboard /></AuthRoute>} path="" />
          <Route element={<AuthRoute><AddCategory /></AuthRoute>} path="add-category" />
          <Route element={<AuthRoute><UpdatePost /></AuthRoute>} path="update-post/:postId" />
          <Route element={<AuthRoute><MyFollowing /></AuthRoute>} path="my-followings" />
          <Route element={<AuthRoute><MyFollowers /></AuthRoute>} path="my-followers" />
          <Route element={<AuthRoute><CreatePlan /></AuthRoute>} path="create-plan" />
          <Route element={<AuthRoute><Settings /></AuthRoute>} path="settings" />
          <Route element={<AuthRoute><Notifications /></AuthRoute>} path="notifications" />
          <Route element={<AuthRoute><MyEarnings /></AuthRoute>} path="my-earnings" />
          <Route element={<AuthRoute><AddEmailComponent /></AuthRoute>} path="add-email" />
          <Route element={<AuthRoute><UploadProfilePic /></AuthRoute>} path="upload-profile-photo" />
          <Route element={<AuthRoute><DashboardPosts /></AuthRoute>} path="posts" />
          <Route element={<AuthRoute><AccountVerifiedComponent /></AuthRoute>} path="account-verification/:verifyToken" />
        </Route>
        <Route element={<Register />} path="/register" />
        <Route element={<AuthRoute><Profile /></AuthRoute>} path="/profile" />
        <Route element={<Pricing />} path="/pricing" />
        <Route element={<CheckoutForm />} path="/checkout/:planId" />
        <Route element={<AuthRoute><PaymentSuccess /></AuthRoute>} path="/success" />
        <Route element={<AuthRoute><PayingFreePlan /></AuthRoute>} path="/free-subscription" />
        <Route element={<Rankings />} path="/rankings" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
