import React, { useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Error from "../UI/Error";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";

const ScanAndPayForm = (props) => {
    const [error, setError] = useState(null);
    const accountData = props.data
    const actionData = useActionData();
    useEffect(() => {
      if (actionData && actionData.result === true) {
        setError(null);
      }
      if (actionData && actionData.result === false) {
        setError(actionData.message || 'Something wrong.');
      }
    }, [actionData]);

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
            <p className=" text-black/60">{accountData.from_name}</p>
            <p className=" text-black/60">{accountData.from_phone}</p>
        </div>
        <div className="mb-3">
            <h1 className="mb-1 font-semibold">To</h1>
            <p className=" text-black/60">{accountData.to_name}</p>
            <p className=" text-black/60">{accountData.to_phone}</p>
        </div>
        <Error error={error}/>
        <div>
            <Form method="POST">
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

export default ScanAndPayForm;
