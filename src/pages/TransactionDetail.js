import React, { Suspense } from "react";
import { Await, defer, useAsyncError, useLoaderData } from "react-router-dom";
import { getToken } from "../utils/auth";
import Detail from "../components/Transaction/Detail";

const Error = () => {
    const error = useAsyncError()
    console.log(error)
    const message = error.message || 'Something wrong.'

    return <p className="text-center text-[red]">{message}</p>
}

const TransactionDetail = () => {
    const loadedData = useLoaderData()
    return (
        <Suspense fallback={<p className="text-center">Loading ...</p>}>
            <Await resolve={loadedData.transaction} errorElement={<Error/>}>
                {(data) => <Detail data={data.data}/>}
            </Await>
        </Suspense>
    );
};

export default TransactionDetail;

const transactionLoader = async (params) => {
    const trx_id = params.trx_id;
    const response = await fetch('http://localhost:8000/api/transaction/' + trx_id , {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })

    if(response.status === 404) {
        const errResponse = await response.json()
        throw errResponse 
    }

    if(!response.ok) {
        throw response
    }

    const resData = await response.json()
    return resData
} 

export const loader = async({request, params}) => {
    return defer({
        transaction: transactionLoader(params)
    })
}
