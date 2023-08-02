import React, { useState } from "react";
import Input from "../UI/Input";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Textarea from "../UI/Textarea";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
import { getToken } from "../../utils/auth";

import { Form } from "react-router-dom";
import Error from "../UI/Error";

const TransferForm = (props) => {
    const profileInfo = props.data
    const [verifyToAccount, setVerifyToAccount] = useState(null)

    const {
        isLoading: requestLoading,
        error: requestError,
        sendRequest
    } = useHttp()

    const checkToAccount = (e) => {
        e.preventDefault()
        if(!toPhoneIsValid) {
            return
        }
        sendRequest({
            url: 'http://localhost:8000/api/to-account-verify?phone=' + toPhoneValue,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getToken() 
            },
        }, (value) => setVerifyToAccount(value))
    }

    const {
        value: toPhoneValue,
        isValid: toPhoneIsValid,
        changeHandler: toPhoneChangeHandler,
        blurHandler: toPhoneBlurHandler,
    } = useInput((value) => value.trim() !== '');
    
    const {
        value: amountValue,
        hasError: amountHasError,
        changeHandler: amountChangeHandler,
        blurHandler: amountBlurHandler,
    } = useInput((value) => value.trim() !== '');
    
    const {
        value: descriptionValue,
        changeHandler: descriptionChangeHandler,
        blurHandler: descriptionBlurHandler,
    } = useInput((value) => true);

    return (
        <div className="bg-white p-4 rounded-lg">
            <div className="mb-3">
                <h1 className="mb-1 font-semibold">From</h1>
                <p className=" text-black/60">{profileInfo.name}</p>
                <p className=" text-black/60">{profileInfo.phone}</p>
            </div>
            <Error error={props.error}/>
            <div>
                <Form method="POST">
                    <div className="flex items-end w-full">
                        <Input type='tel' label='To ' name='to_phone' 
                            conditionalLabel={!requestError && verifyToAccount ? verifyToAccount.data.name : requestError}
                            onChange={toPhoneChangeHandler}
                            onBlur={toPhoneBlurHandler}
                            value={toPhoneValue}
                        />
                        <button disabled={requestLoading} onClick={checkToAccount} className="mb-3 ms-[-5px] rounded-s-none h-[40px] z-10 hover:bg-[#5842e3]"><BsFillCheckCircleFill/></button>
                    </div>
                    <Input type='text' label='Amount (MMK)' name='amount'  
                        onChange={amountChangeHandler}
                        onBlur={amountBlurHandler}
                        value={amountValue}
                        error={amountHasError}
                    />
                    <Textarea type='text' label='Description' name='description'  
                        onChange={descriptionChangeHandler}
                        onBlur={descriptionBlurHandler}
                        value={descriptionValue}
                    />
                    <button className="w-full mt-3">Continue</button>
                </Form>
            </div>
        </div>
    );
};

export default TransferForm;


