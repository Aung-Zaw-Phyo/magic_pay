import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import Profile from "../components/Home/Profile";

const Home = () => {
  const profileData = useRouteLoaderData('profile')
  return (

    <Profile data={profileData.data}/>

  )
};

export default Home;


