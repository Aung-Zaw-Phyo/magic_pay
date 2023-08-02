import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import Info from "../components/Account/Info";

const Account = () => {
  const profileData = useRouteLoaderData('profile')
  return (

      <Info data={profileData.data}/>

  );
};

export default Account;
