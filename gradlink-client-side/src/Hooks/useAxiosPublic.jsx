import axios from 'axios';
import React from 'react';


const axiosPublic = axios.create({
  baseURL: `http://localhost:3000/users`
})


const useAxiosPublic = () => {
  return axiosPublic
};

export default useAxiosPublic;