import React from "react";
import { Link } from "react-router-dom";
import {AiFillHome} from 'react-icons/ai'
import {GiWallet} from 'react-icons/gi'
import {GrTransaction} from 'react-icons/gr'
import {FiUser} from 'react-icons/fi'

const Footer = () => {
  return (
    <div className="bg-white fixed right-0 left-0 bottom-0">
      <div className="container py-3 grid grid-cols-4 w-full">
        <Link to='/' className='w-full flex flex-col items-center justify-center hover:text-[#5842e3] duration-300'><AiFillHome className="text-[22px] mb-1"/><span className="text-[12px]">Home</span></Link>
        <Link to='/wallet' className='w-full flex flex-col items-center justify-center hover:text-[#5842e3] duration-300'><GiWallet className="text-[22px] mb-1"/><span className="text-[12px]">Wallet</span></Link>
        <Link to='/transaction' className='w-full flex flex-col items-center justify-center hover:text-[#5842e3] duration-300'><GrTransaction className="text-[22px] mb-1"/><span className="text-[12px]">Transaction</span></Link>
        <Link to='/profile' className='w-full flex flex-col items-center justify-center hover:text-[#5842e3] duration-300'><FiUser className="text-[22px] mb-1"/><span className="text-[12px]">Account</span></Link>
      </div>
    </div>
  )
};

export default Footer;
