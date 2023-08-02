import React from "react";
import { HiCheckCircle } from "react-icons/hi";

const Detail = (props) => {
  const transaction = props.data;

  return (
    <>
      <div className="bg-white p-4 pb-8 rounded-lg">
        <div className="flex flex-col items-center text-[#4BAE4F] font-semibold mb-3">
          <HiCheckCircle size={100} />
          <p className="mt-1">{transaction.amount}</p>
        </div>
        <div className="flex justify-between py-3 border-b-2">
          <p className="text-black/60">Trx Id</p>
          <p>{transaction.trx_id}</p>
        </div>
        <div className="flex justify-between py-3 border-b-2">
          <p className="text-black/60">Reference Number</p>
          <p>{transaction.ref_no}</p>
        </div>
        <div className="flex justify-between py-3 border-b-2">
          <p className="text-black/60">Type</p>
          <p>
            {transaction.type === 1 ? (
              <span className="bg-[#198754] text-[14px] text-white p-1 rounded">
                Income
              </span>
            ) : (
              <span className="bg-[#DC3545] text-[14px] text-white p-1 rounded">
                Expense
              </span>
            )}
          </p>
        </div>
        <div className="flex justify-between py-3 border-b-2">
          <p className="text-black/60">Amount</p>
          <p>{transaction.amount}</p>
        </div>
        <div className="flex justify-between py-3 border-b-2">
          <p className="text-black/60">Date and Time</p>
          <p>{transaction.date_time}</p>
        </div>
        <div className="flex justify-between py-3 border-b-2">
          <p className="text-black/60">From</p>
          <p>{transaction.source}</p>
        </div>
        <div className="flex justify-between py-3 border-b-2">
          <p className="text-black/60">Description</p>
          <p>{transaction.description}</p>
        </div>
      </div>
    </>
  );
};

export default Detail;
