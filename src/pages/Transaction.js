import React from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getToken } from "../utils/auth";
import TransactionList from "../components/Transaction/TransactionList";
import { Suspense } from "react";

const Transaction = () => {
  const loadedData = useLoaderData()
  return (
    <Suspense fallback={<p className="text-center">Loading ...</p>}>
      <Await resolve={loadedData.transactions} errorElement={<p className="text-center text-[red]">Something wrong!</p>}>
        {(data) => <TransactionList data={data}/>}
      </Await>
    </Suspense>
  );
};

export default Transaction;

const transactionLoader = async (request, params) => {
  let url = 'http://localhost:8000/api/transaction'
  const paginateLink = request.url.split('link=')[1]
  if (paginateLink) {
      url = paginateLink
  }

  const response = await fetch(url , {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })

  if(!response.ok) {
    return {message: 'Coult not fetch transactions', result: false}
  }
  
  const resData = await response.json()
  return resData
}

export const loader = ({request, params}) => {
  return defer({
    transactions: transactionLoader(request, params)
  })
}