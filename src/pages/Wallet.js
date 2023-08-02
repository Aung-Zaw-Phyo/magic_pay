import React from "react";
import { useRouteLoaderData } from "react-router-dom";

const Wallet = () => {
  const profileData = useRouteLoaderData('profile')
  const profileInfo = profileData.data
  return ( //#5842e3
    <div className="bg-[#5842e3] text-white p-4 rounded-lg">
      <div className="mb-3">
        <p className="text-[12px] mb-1">BALANCE</p>
        <h1 className="text-[22px] font-semibold">{profileInfo.balance} <span className="text-[12px]">MMK</span></h1>
      </div>
      <div className="mb-3">
        <p className="text-[12px] mb-1">ACCOUNT NUMBER</p>
        <h1 className="text-[22px] font-semibold">{profileInfo.account_number}</h1>
      </div>
      <div className="mb-3">
        <h1 className="text-[22px] font-semibold">{profileInfo.name}</h1>
      </div>
    </div>
  );
};

export default Wallet;
