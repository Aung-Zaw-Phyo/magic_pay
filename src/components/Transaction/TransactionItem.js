import React from "react";
import { Link } from "react-router-dom";

const TransactionItem = ({transaction}) => {
  return (
    <Link to={`/transaction/${transaction.trx_id}`}  className="bg-white block p-4 rounded-lg mb-2 hover:text-[#5842e3] duration-300">
        <div className="flex justify-between mb-1">
            <h1>Trx Id: {transaction.trx_id}</h1>
            <p className="text-black/60">{transaction.amount}</p>
        </div>
        <p className="text-black/60">{transaction.title}</p>
        <p className="text-black/60">{transaction.date_time}</p>
    </Link>
  );
};

export default TransactionItem;
