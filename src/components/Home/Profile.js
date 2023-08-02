import React from "react";

import {AiOutlineScan} from 'react-icons/ai'
import {AiOutlineQrcode} from 'react-icons/ai'
import {FcMoneyTransfer} from 'react-icons/fc'
import {GiWallet} from 'react-icons/gi'
import {GrTransaction} from 'react-icons/gr'
import { SlArrowRight } from "react-icons/sl";
import { Link,  } from "react-router-dom";

const Profile = (props) => {
    const data = props.data
    const profileData = data
    return (
        <div>
            <div className="flex flex-col items-center py-4">
                <div className="mb-3">
                    <img className="rounded-full w-[90px] h-[90px]" src={profileData.profile} alt="" />
                </div>
                <h1 className="text-[20px] mb-2">{profileData.name}</h1>
                <p>{profileData.balance} MMK</p>
            </div>
            <div>
                <div className="grid grid-cols-2 mb-4 gap-3">
                    <Link to='scan-and-pay' className="bg-white p-4 drop-shadow flex items-center rounded-md hover:text-[#5842e3] duration-300">
                        <AiOutlineScan size={30} className="mr-3 text-[#333]"/>
                        <span>Scan & Pay</span>
                    </Link>
                    <Link to='receive-qr' className="bg-white p-4 drop-shadow flex items-center rounded-md hover:text-[#5842e3] duration-300">
                        <AiOutlineQrcode size={30} className="mr-3 text-[#333]"/> 
                        <span>Receive QR</span>
                    </Link>
                </div>
                <div className=" rounded-md bg-white mb-4 drop-shadow">
                    <Link to='transfer' className="p-3 py-4 flex justify-between items-center hover:text-[#5842e3] duration-300">
                        <div className="flex items-center">
                            <FcMoneyTransfer size={30} className="mr-3 text-[#333]"/> 
                            <span>Transfer</span>
                        </div>
                        <SlArrowRight className="self-center" size={15}/>
                    </Link>
                    <div className="h-[1px] bg-gray-300 mx-3"/>
                    <Link to='wallet' className="p-3 py-4 flex justify-between items-center hover:text-[#5842e3] duration-300">
                        <div className="flex items-center">
                            <GiWallet size={30} className="mr-3 text-[#333]"/> 
                            <span>Wallet</span>
                        </div>
                        <SlArrowRight className="self-center" size={15}/>
                    </Link>
                    <div className="h-[1px] bg-gray-300 mx-3"/>
                    <Link to='transaction' className="p-3 py-4 flex justify-between items-center hover:text-[#5842e3] duration-300">
                        <div className="flex items-center">
                            <GrTransaction size={30} className="mr-3 text-[#333]"/> 
                            <span>Transaction</span>
                        </div>
                        <SlArrowRight className="self-center" size={15}/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
