import React from "react";
import image from './../images/update_password.png'
import { Form, redirect, useActionData } from "react-router-dom";
import Input from "../components/UI/Input";
import useInput from "../hooks/use-input";
import { getToken } from "../utils/auth";
import Error from "../components/UI/Error";

const UpdatePassword = () => {
    const {
        value: oldValue,
        isValid: oldIsValid,
        hasError: oldHasError,
        changeHandler: oldChangeHandler,
        blurHandler: oldBlurHandler
    } = useInput((value) => value.trim() !== '')

    const {
        value: newValue,
        isValid: newIsValid,
        hasError: newHasError,
        changeHandler: newChangeHandler,
        blurHandler: newBlurHandler
    } = useInput((value) => value.trim() !== '')

    const data = useActionData()

    const isDisabled = !oldIsValid || !newIsValid

    return (
            <div className="bg-white p-4 rounded-lg">
                <img src={image} className="mx-auto w-[220px]" alt="" />
                <Form method="POST">
                    {data && data.result === false && (
                        <Error error={data.message}/>
                    )}
                    <Input type='password' label='Old Password' name='old_password'
                        onChange={oldChangeHandler}
                        onBlur={oldBlurHandler}
                        value={oldValue}
                        error={oldHasError}
                    />

                    <Input type='password' label='New Password' name='new_password'
                        onChange={newChangeHandler}
                        onBlur={newBlurHandler}
                        value={newValue}
                        error={newHasError}
                    />

                    <button disabled={isDisabled} className={`${isDisabled && 'btn_disable'} w-full mt-3`}>Update Password</button>
                </Form>
            </div>
    );
};

export default UpdatePassword;

export const action = async ({request, params}) => {
    const data = await request.formData()

    const old_password = data.get('old_password')
    const new_password = data.get('new_password')

    const response = await fetch('http://localhost:8000/api/update-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify({old_password, new_password})
    })

    if(response.status === 422){
        return response
    }

    if(!response.ok) {
        throw response
    }

    const resData = await response.json()

    return redirect('/')
}
