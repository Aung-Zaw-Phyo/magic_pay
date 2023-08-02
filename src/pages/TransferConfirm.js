import React, { useState } from "react";
import Confirmation from "../components/Transfer/Confirmation";
import {
  redirect,
  useActionData,
  useLoaderData,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import { HmacSHA256 } from "crypto-js";
import Error from "../components/UI/Error";
import { getToken } from "../utils/auth";
import { useEffect } from "react";
const TransferConfirm = (props) => {
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [error, setError] = useState(null);

  const transferData = useLoaderData();
  const profileData = useRouteLoaderData("profile");
  const submit = useSubmit();
  const actionData = useActionData();

  useEffect(() => {
    if (actionData && actionData.result === false) {
      setIsShowConfirm(false);
      setError(actionData.message);
    }
    if (actionData && actionData.result === true) {
      setIsShowConfirm(false);
      setError(null);
      console.log(actionData);
    }
  }, [actionData]);

  const to_name = transferData.to_name;
  const to_phone = transferData.to_phone;
  const amount = transferData.amount;
  const description = transferData.description;

  const submitHandler = (password) => {
    const hash_value = HmacSHA256(
      to_phone + amount + description,
      "magicpay123!@#"
    ).toString();
    submit(
      {
        to_phone: to_phone,
        amount: amount,
        description: description,
        password: password,
        hash_value: hash_value,
      },
      {
        method: "POST",
      }
    );
  };

  const showConfirmChangeHandler = () => {
    setIsShowConfirm((prev) => !prev);
  };
  return (
    <div className="bg-white p-4 rounded-lg">
      {isShowConfirm && (
        <Confirmation
          onShowHandler={showConfirmChangeHandler}
          onSubmitHandler={submitHandler}
        />
      )}
      <div className="">
        <Error className="mb-3" error={error} />
        <div className="mb-3">
          <h1 className="mb-1 font-semibold"> From </h1>
          <p className=" text-black/60"> {profileData.data.name} </p>
          <p className=" text-black/60"> {profileData.data.phone} </p>
        </div>
        <div className="mb-3">
          <h1 className="mb-1 font-semibold"> To </h1>
          <p className=" text-black/60"> {to_name} </p>
          <p className=" text-black/60"> {to_phone} </p>
        </div>
        <div className="mb-3">
          <h1 className="mb-1 font-semibold"> Amount(MMK) </h1>
          <p className=" text-black/60"> {amount} </p>
        </div>
        <div className="mb-3">
          <h1 className="mb-1 font-semibold"> Description </h1>
          <p className=" text-black/60"> {description} </p>
        </div>
        <div>
          <button onClick={showConfirmChangeHandler} className="w-full mt-3">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferConfirm;

export const loader = ({ request, params }) => {
  const queryParams = new URL(request.url).searchParams;
  const hash_value = queryParams.get("hash_value");
  const to_name = queryParams.get("to_name");
  const to_phone = queryParams.get("to_phone");
  const amount = queryParams.get("amount");
  const description = queryParams.get("description");

  const isExistValues = hash_value && to_name && to_phone && amount;
  const hash_value2 = HmacSHA256(
    to_name + to_phone + amount + description,
    "magicpay123!@#"
  ).toString();

  if (!isExistValues) {
    return redirect("/transfer");
  }
  if (hash_value !== hash_value2) {
    return redirect("/transfer");
  }

  return {
    to_name,
    to_phone,
    amount,
    description,
  };
};

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const formData = {
    to_phone: data.get("to_phone"),
    amount: data.get("amount"),
    description: data.get("description"),
    hash_value: data.get("hash_value"),
    password: data.get("password"),
  };
  const response = await fetch("http://localhost:8000/api/transfer/complete", {
    method: "POSt",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(formData),
  });
  if (response.status === 404) {
    return response;
  }

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw response;
  }

  const resData = await response.json();
  const trx_id = resData.data.trx_id;
  console.log(trx_id);
  return redirect(`/transaction/${trx_id}`);
};
