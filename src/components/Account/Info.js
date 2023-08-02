import React from "react";
import { Link } from "react-router-dom";
import {SlArrowRight} from 'react-icons/sl'
import Logout from "./Logout";

const Info = (props) => {
    const profileData = props.data
    return (
        <div>
            <div className="flex flex-col items-center py-4">
                <div className="mb-3">
                    <img className="rounded-full w-[90px] h-[90px]" src={profileData.profile} alt="" />
                </div>
            </div>
            <div className=" rounded-md bg-white drop-shadow mb-4">
                <div to='transfer' className="p-3 py-4 flex items-center justify-between ">
                    <span>Username</span>
                    <span>{profileData.name}</span>
                </div>
                <div className="h-[1px] bg-gray-300 mx-3"/>
                <div to='wallet' className="p-3 py-4 flex items-center justify-between ">
                    <span>Email</span>
                    <span>{profileData.email}</span>
                </div>
                <div className="h-[1px] bg-gray-300 mx-3"/>
                <div to='transaction' className="p-3 py-4 flex items-center justify-between ">
                    <span>Phone</span>
                    <span>{profileData.phone}</span>
                </div>
            </div>

            <div className=" rounded-md bg-white drop-shadow mb-4">
                <Link to='/update-password' className="p-3 py-4 flex items-center justify-between ">
                    <span>Update Password</span>
                    <SlArrowRight size={15}/>
                </Link>
                <div className="h-[1px] bg-gray-300 mx-3"/>
                <Logout/>
            </div>
        </div>
    );
};

export default Info;
