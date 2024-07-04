import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { checkAuthStatusAPI } from '../../APIServices/users/usersAPI';
import {useDispatch} from "react-redux";
import { isAuthenticated } from '../../redux/slices/authSlices';
const Profile = () => {
    const {isError, isLoading, data, error, refetch} = useQuery({
        queryKey: ['user-auth'],
        queryFn: checkAuthStatusAPI
    });
const dispatch = useDispatch();
useEffect(()=>{
dispatch(isAuthenticated(data))
},[data])

    return (
    <div>
      profile
    </div>
  )
}

export default Profile
