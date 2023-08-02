import React, { useEffect, useState } from "react";
import Input from "../components/UI/Input";
import { Form, Link, json, redirect, useActionData, useNavigation } from "react-router-dom";
import useInput from "../hooks/use-input";

const Login = () => {
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const {
    value: phoneValue,
    hasError: phoneHasError,
    changeHandler: phoneChangeHandler,
    blurHandler: phoneBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: passwordValue,
    hasError: passwordHasError,
    changeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim().length >= 8);

  const data = useActionData()
  const navigation = useNavigation()

  useEffect(() => {
    if(navigation.state === 'submitting') {
      setSubmitting(true)
    }
  }, [navigation]) 

  useEffect(() => {
    if(data && data.result === false){
      setError(data.message)
      setSubmitting(false)
    }
  }, [data])

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="container py-4">
        <div className="mx-auto w-full md:w-[65%] lg:w-[50%] p-4 bg-white drop-shadow-lg rounded-lg">
          <h1 className="title text-center"> Login </h1>
          <p className="text-center mb-3 text-black/80">
            Fill the form to login
          </p>
          {error && <div className="p-3 mb-2 bg-gray-100 text-center text-[red]">{error}</div>}
          <Form method="POST">
            <Input
              type="text" 
              name="phone"
              label="Phone"
              value={phoneValue}
              onChange={phoneChangeHandler}
              onBlur={phoneBlurHandler}
              error={phoneHasError}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordHasError}
            />
            <button disabled={submitting ? true : false} className={`${submitting ? 'btn_disable' : ''} w-full mt-3`}> Login </button>
          </Form>
          <Link
            to="/register"
            className="mt-4 block hover:text-[#5842e3] duration-300"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

export const action = async ({request, params}) => {
  const data = await request.formData()
  const formData = {
      phone: data.get('phone'),
      password: data.get('password'),
  }
  const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
          'Content-Type': 'application/json',
      }
  })

  if(response.status === 422) {
      return response
  }
  
  if(!response.ok){
      throw json({message: 'Could not login.'}, {status: 500})
  }

  const resData = await response.json();
  const token = resData.data.token;
  localStorage.setItem('token', token)

  return redirect('/')
}
