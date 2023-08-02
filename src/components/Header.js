import React from "react";
import {BsFillBellFill} from 'react-icons/bs'
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import {MdOutlineArrowBackIos} from 'react-icons/md'

const Header = () => {
    const navigate = useNavigate()
    const profileInfo = useRouteLoaderData('profile')
    const noti_count = profileInfo.data.unread_noti_count
    const back = () => {
        navigate(-1)
    }
    return (
        <div className="bg-white fixed right-0 left-0 top-0">
            <div className="container py-2 flex justify-between items-center">
                <div>
                    <span onClick={back} className="cursor-pointer py-2 px-3 block text-center hover:text-[#5842e3] duration-300"><MdOutlineArrowBackIos size={20}/></span>
                </div>
                <h1 className="title text-center">Magic Pay</h1>
                <Link to='/notification' className=" relative py-2 px-3 block text-center hover:text-[#5842e3] duration-300">
                    <BsFillBellFill size={20}/>
                    <span className="absolute top-0 right-[-4px] bg-[red] px-[5px] text-[12px] text-white font-semibold rounded-3xl">
                        {noti_count}
                    </span>
                </Link>
            </div>
        </div>
    )
};

export default Header;
