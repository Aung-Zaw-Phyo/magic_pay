import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import QrReader from 'react-qr-scanner'
import {AiOutlineClose} from 'react-icons/ai'
import scan_img from '../images/qr-scan-with-code.png'
import Error from "../components/UI/Error";
import { getToken } from "../utils/auth";
import { redirect, useActionData, useSubmit } from "react-router-dom";

const Backdrop = ({onShowHandler}) => {
  return (
    <div onClick={onShowHandler} className="fixed top-0 bottom-0 w-full h-screen bg-gray-600/60 z-10"/>
  )
}

const ScanAction = ({onShowHandler}) => {
  const submit = useSubmit()
  const handleScan = (data) => {
    if(data && data.text) {
      const phone = data.text
      submit({phone: phone}, {method: 'POST'})
      onShowHandler()
    }
  }

  const handleError = (error) => {
    console.log(error)
  }

  return (
    <div className="absolute w-[460px] p-3 left-[50%] top-0 z-50" style={{ transform: 'translateX(-50%)' }}>
      <div className="bg-white p-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-[22px]">Scan QR Code</h1>
          <AiOutlineClose size={25} className="cursor-pointer hover:scale-150 duration-300" onClick={onShowHandler}/>
        </div>
        <QrReader
          delay={100}
          className='w-[460px] h-[320px] mt-3'
          onError={handleError}
          onScan={handleScan}
        />
      </div>
    </div>
  )
}

const portalElement = document.getElementById('qr-scan-action')

const Modal = (props) => {
  return (
    <>
      {createPortal(<ScanAction onShowHandler={props.onScannerShowHandler}/>, portalElement)}
      {createPortal(<Backdrop  onShowHandler={props.onScannerShowHandler}/>, portalElement)}
    </>
  )
}

const Scan = () => {
  const [scannerIsShow, setScannerIsShow] = useState(false)
  const [error, setError] = useState(null)
  const actionData = useActionData()

  useEffect(() => {
    if(actionData && actionData.result === false)  {
      setError(actionData.message)
    }
  }, [actionData])

  const scannerShowHandler = () => {
    setScannerIsShow((prevState) => !prevState)
  }
  
  return (
    <>
      {
        scannerIsShow && <Modal onScannerShowHandler={scannerShowHandler} />
      }
      <div className="bg-white p-4 rounded-lg flex flex-col justify-center items-center">
        <Error error={error} />
        <img className="w-[220px] h-[220px] mb-3" src={scan_img} alt="" />
        <p className="mb-6">Click button, put QR code in the frame and pay</p>
        <button onClick={scannerShowHandler}>Scan</button>
      </div>
    </>
  );
};

export default Scan;

export const action = async({request, params}) => {
  const data = await request.formData()
  const phone = data.get('phone');
  const respone = await fetch('http://localhost:8000/api/scan-and-pay-form?to_phone=' + phone, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    }
  })

  if(respone.status === 404) {
    return respone
  }
  
  if(!respone.ok) {
    return {result: false, message: 'Something wrong.'}
  }

  const resData = await respone.json()
  return redirect('/scan-and-pay-form?phone=' + resData.data.to_phone)
}
