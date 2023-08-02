import React, { useState } from "react";
import { createPortal } from "react-dom";
import {PiWarningCircleThin} from 'react-icons/pi'
import Input from "../UI/Input";

const Backdrop = ({onShowHandler}) => {
    return (
      <div onClick={onShowHandler} className="fixed top-0 bottom-0 w-full h-screen bg-gray-600/60 z-10"/>
    )
}

const Modal = (props) => {  
    const [password, setPassword] = useState('')

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value)
    }

    return (
      <div className="absolute w-[100%] md:w-[70%] lg:w-[60%] xl:w-[40%] p-3 left-[50%] top-0 z-50" style={{ transform: 'translateX(-50%)' }}>
        <div className="bg-white p-6 rounded">
            <div className="mb-3 flex justify-center">
                <PiWarningCircleThin size={80} className="text-[#333333b5]"/>
            </div>
            <div className="mb-3">
                <div className="text-center mb-[-20px] font-semibold text-black/60">Please enter your password</div>
                <Input type='password' className='text-center'
                    onChange={passwordChangeHandler}
                    value={password}
                    focus={true}
                />
            </div>
            <div className="mb-3 text-center">
                <button onClick={props.onShow} className="m-1">Cancel</button>
                <button disabled={password.trim() === ''} onClick={props.onSubmit.bind(null, password)} className="m-1">Confirm</button>
            </div>
        </div>
      </div>
    )
}

const portalElement = document.getElementById('transfer-complete-modal')

const Confirmation = (props) => {
    return (
        <>
            {
                createPortal(<Backdrop/>, portalElement)
            }
            {
                createPortal(<Modal onShow={props.onShowHandler} onSubmit={props.onSubmitHandler}/>, portalElement)
            }
        </>
    );
};

export default Confirmation;
