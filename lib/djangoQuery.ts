"use server"

import { TokenData } from "./typescript";

export const TokenFetch = async() => {
    const res = await fetch(`${process.env.DJANGO_API_URL}`,)
    const data: TokenData[] = await res.json();
    return data
  }

export const getCsrfToken = async () => {
  const res = await fetch(`${process.env.DJANGO_API_URL}/csrf/`, {
    credentials: "include",  // Ensure cookies are sent
  });
  const data = await res.json();
  return data.csrfToken;
}; 

export const RegisterUser = async(values:any) => {

    const res = await fetch(`${process.env.DJANGO_API_URL}/register/`, {
      method: "POST", // Specify POST method
      headers: {
        "Content-Type": "application/json", // Ensure JSON format
      },
      body: JSON.stringify(values), // Convert values to JSON
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Register Failed");
    }
    return await res.json();
}


export const Login = async(values:any) => {
  const csrfToken = await getCsrfToken(); // Get CSRF token before login

  const res = await fetch(`${process.env.DJANGO_API_URL}/login/`, {
    method: "POST", // Specify POST method
    headers: {
      "Content-Type": "application/json", // Ensure JSON format
      "X-CSRFToken": csrfToken,  // Include CSRF token
    },
    credentials: "include",  // Required for cookies to be sent
    body: JSON.stringify(values), // Convert values to JSON
  });
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "login Failed");
  }

  return await res.json();
}


export const UpdateProfileName = async (values: any) => {

  const res = await fetch(`${process.env.DJANGO_API_URL}/updateprofilename/`,{
    method: "POST",   //  Specify POST method
    headers: {
      "Content-Type": "application/json", // Ensure JSON format
    },
    body: JSON.stringify(values),
  })
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "updateprofilename Failed");
  }
  return await res.json();
}


export const UpdateUserPassword = async (values: any) => {

  const res = await fetch(`${process.env.DJANGO_API_URL}/updateprofilenpassword/`,{
    method: "POST",   //  Specify POST method
    headers: {
      "Content-Type": "application/json", // Ensure JSON format
    },
    body: JSON.stringify(values),
  })

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "updateprofilenpassword Failed");
  }
  
  return await res.json();
}


export const GetUserTransaction = async (value:any) =>{
  const res = await fetch(`${process.env.DJANGO_API_URL}/getusertransaction/${value}/`)
  
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Transaction Failed");
  }
  return await res.json();
}
