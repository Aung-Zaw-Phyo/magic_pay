import React from "react";
import QRCode from "react-qr-code";
import { useRouteLoaderData } from "react-router-dom";

const Qr = () => {
  const loadedData = useRouteLoaderData('profile')
  const profileInfo = loadedData.data
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col justify-center items-center">
      <h1 className="text-[22px] mb-4">QR Scan to pay me</h1>
      <div className="w-[200px] h-[200px] mb-4">
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={profileInfo.phone}
          viewBox={`0 0 256 256`}
        />
      </div>
        <h1 className="text-[20px] font-semibold mb-1">{profileInfo.name}</h1>
        <p>{profileInfo.phone}</p>
    </div>
  );
};

export default Qr;
