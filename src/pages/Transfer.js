import React, { useEffect, useState } from "react";
import {
  redirect,
  useActionData,
  useRouteLoaderData,
} from "react-router-dom";
import TransferForm from "../components/Transfer/TransferForm";
import { getToken } from "../utils/auth";
import { HmacSHA256 } from "crypto-js";

const Transfer = () => {
  const [error, setError] = useState(null);
  const profileData = useRouteLoaderData("profile");
  const actionData = useActionData();
  useEffect(() => {
    if (actionData && actionData.result === true) {
      setError(null);
    }
    if (actionData && actionData.result === false) {
      setError(actionData.message);
    }
  }, [actionData]);

  return (
        <TransferForm data={profileData.data} error={error} />
  );
};

export default Transfer;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const to_phone = data.get("to_phone").trim();
  const amount = data.get("amount").trim();
  const description = data.get("description").trim();
  const hash_value = HmacSHA256(
    to_phone + amount + description,
    "magicpay123!@#"
  ).toString();
  const response = await fetch("http://localhost:8000/api/transfer/confirm", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify({
      to_phone,
      amount,
      description,
      hash_value,
    }),
  });
  if (!response.ok) {
    return response;
  }

  const resData = await response.json();
  const completeHashed = HmacSHA256(
    resData.data.to_name +
    resData.data.to_phone +
    resData.data.amount +
    description,
    "magicpay123!@#"
    ).toString();
    const queryValue = `?hash_value=${completeHashed}&to_name=${resData.data.to_name}&to_phone=${resData.data.to_phone}&amount=${resData.data.amount}&description=${encodeURIComponent(description)}`;
  return redirect(`/transfer/confirm` + queryValue);
};
