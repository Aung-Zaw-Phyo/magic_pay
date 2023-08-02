import React from "react";
import { Outlet, defer} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getToken } from "../utils/auth";

const Root = () => {
  return (
    <>
        <Header/>
        <div className="container my-[70px] pb-4">
            <Outlet/>
        </div>
        <Footer/>
    </>
  );
};

export default Root;

export const loader = async () => {
  const response = await fetch('http://localhost:8000/api/profile', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + getToken() 
    }
  })

  if(response.status === 401) {
    throw response
  }

  if(!response.ok){
    throw response;
    // throw json(
    //   { message: "Could not fetch data." },
    //   {
    //     status: 500,
    //   }
    // );
  }
  const resData = await response.json()

  return resData;
}