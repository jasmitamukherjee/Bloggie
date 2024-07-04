import React from 'react'
import Login from '../User/Login';
import { useQuery } from '@tanstack/react-query';
import { checkAuthStatusAPI } from '../../APIServices/users/usersAPI';
import { Navigate } from 'react-router-dom';
import AuthCheckingComponent from './AuthCheckingComponent';
const AuthRoute = ({children}) => {
    const {isError, isLoading, data, error, refetch} = useQuery({
        queryKey: ['user-auth'],
        queryFn: checkAuthStatusAPI
    });
if(isLoading) return <AuthCheckingComponent/>
if(!data)
{
return <Navigate to="/login"/>
}    

return children;

  
}

export default AuthRoute
