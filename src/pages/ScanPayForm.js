import React, { Suspense, useCallback, useEffect } from "react";
import { Await, defer, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import ScanAndPayForm from "../components/Transfer/ScanAndPayForm";
import { HmacSHA256 } from "crypto-js";

const Error = () => {
    const navigate = useNavigate()
    const redirect = useCallback(() => {
        navigate('/scan-and-pay')
    }, [navigate])
    
    useEffect(() => {
        redirect()
    }, [redirect])

    return <p className="text-center">Loading ...</p>

}


const ScanPayForm = (props) => {
    const loadedData = useLoaderData()
    return (
        <Suspense fallback={<p className="text-center">Loading ...</p>}>
            <Await resolve={loadedData.toAccount} errorElement={<Error/>}>
                {(data) => <ScanAndPayForm data={data.data}/>}
            </Await>
        </Suspense>
    )
};

export default ScanPayForm;

export const action = async ({request, params}) => {
	const queryParams = new URL(request.url).searchParams;
    const to_phone = queryParams.get('phone').trim();

    const data = await request.formData()
    const amount = data.get('amount').trim()
    const description = data.get('description').trim()
    const hash_value = HmacSHA256(
        to_phone + amount + description,
        "magicpay123!@#"
      ).toString();

    const response = await fetch('http://localhost:8000/api/scan-and-pay-confirm', {
        method: 'POST',
        headers: {
			'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify({
            to_phone,
            amount,
            description,
            hash_value,
        }),
    })

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
	return redirect(`/scan-and-pay-confirm` + queryValue);
}

const checkPhone = async(request, params) => {
    const queryParams = new URL(request.url).searchParams;
    const phone = queryParams.get('phone');
    const response = await fetch('http://localhost:8000/api/scan-and-pay-form?to_phone=' + phone, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + getToken()
      }
    })
  
    if(response.status === 404) {
        const resData = await response.json()
        throw resData
    }
    
    if(!response.ok) {
        throw response
    }
  
    const resData = await response.json()
    return resData
}

export const loader = async ({request, params}) => {
    return defer({
        toAccount: checkPhone(request, params)
    })
}