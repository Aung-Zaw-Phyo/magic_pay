import React, { useState } from "react";
import { createPortal } from "react-dom";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";


const Backdrop = ({onChange}) => {
    return (
      <div onClick={onChange} className="fixed top-0 bottom-0 w-full h-screen bg-gray-600/60 z-10"/>
    )
  }
  
  const LogoutAction = ({onChange}) => {
        return (
        <div className="absolute w-[460px] p-3 left-[50%] top-0 z-50" style={{ transform: 'translateX(-50%)' }}>
            <div className="bg-white rounded-lg p-6">
                <h1 className="text-center text-[20px]">Are you sure?</h1>
                <div className="text-center mt-3">
                    <button onClick={onChange} className="m-1">Cancel</button>
                    <Link to='/logout'><button className="m-1">Confirm</button></Link>
                </div>
            </div>
        </div>
        )
  }
  
  const portalElement = document.getElementById('logout-modal')
  
  const Modal = (props) => {
    return (
      <>
        {createPortal(<LogoutAction onChange={props.onChange}/>, portalElement)}
        {createPortal(<Backdrop  onChange={props.onChange}/>, portalElement)}
      </>
    )
  }


const Logout = () => {
    const [logoutModalStatus, setLogoutModalStatus] = useState(false)

    const logoutModalStatusHandler = () => {
        setLogoutModalStatus((prev) => !prev)
    }

    return (
        <>
            {logoutModalStatus && <Modal onChange={logoutModalStatusHandler} />}
            <div onClick={logoutModalStatusHandler} className="p-3 py-4 flex items-center justify-between cursor-pointer">
                <span>Logout</span>
                <SlArrowRight size={15}/>
            </div>
        </>
    );
};

export default Logout;
