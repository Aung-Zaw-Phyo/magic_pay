import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import TransactionItem from "./TransactionItem";
import Filter from "./Filter";
import Paginate from "../UI/Paginate";


const TransactionList = (props) => {
    const [transactions, setTransactions] = useState([])
    const [prevPage, setPrevPage] = useState(null)
    const [nextPage, setNextPage] = useState(null)
    const fetcher = useFetcher()
    const transactionsData = props.data;
    const [date, setDate] = useState(null);
    const [type, setType] = useState(null);

    const filterQueryStr = useCallback(() => {
        let readyDate = null
        if(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            readyDate = `${year}-${month}-${day} 00:00:00`;
        }
        const str = `&date=${readyDate || ''}&type=${type || ''}`;

        return str
    }, [date, type])

    useEffect(() => {
        // const query = filterQueryStr()
        setPrevPage(transactionsData.links.prev)
        setNextPage(transactionsData.links.next)
        setTransactions(transactionsData.data)
    }, [transactionsData])

    useEffect(() => {
        const fetcherData = fetcher.data
        if (fetcher.state === "idle" && fetcherData) {
            // const query = filterQueryStr()
            // console.log(fetcherData.transactions)
            setPrevPage(fetcherData.transactions.links.prev)
            setNextPage(fetcherData.transactions.links.next)
            setTransactions(fetcherData.transactions.data)
        }
    }, [fetcher])

    const loadeHandler = (readyDate, readyType) => {
        console.log(readyDate, readyType)
        fetcher.load(`/transaction?index&link=http://localhost:8000/api/transaction?date=${readyDate || ''}&type=${readyType || ''}`)
    }

    const dateChangeHandler = (enteredDate) => {
        setDate(enteredDate)
        const year = enteredDate.getFullYear();
        const month = String(enteredDate.getMonth() + 1).padStart(2, "0");
        const day = String(enteredDate.getDate()).padStart(2, "0");
        const readyDate = `${year}-${month}-${day} 00:00:00`;
        loadeHandler(readyDate, type)
    }
    const typeChangeHandler = (enteredType) => {
        setType(enteredType.value)
        let readyDate = null
        if(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            readyDate = `${year}-${month}-${day} 00:00:00`;
        }

        loadeHandler(readyDate, enteredType.value)
    }


    return (
        <>
            <Filter date={date} onDateChangeHandler={dateChangeHandler} onTypeChangeHandler={typeChangeHandler}/>
            
            <h1 className="text-[18px] font-semibold mb-3">Transactions</h1>
            {
                fetcher.state === 'loading' && <p className="text-center mb-3">Loading ...</p>
            }
            {transactions.map(transaction => (
                <TransactionItem key={transaction.trx_id} transaction={transaction} />
            ))}

             {/* Pagination */}
            <Paginate fetcher={fetcher} prevPage={prevPage} nextPage={nextPage} route="/transaction?index&link=" />
            
        </>
    );
};

export default TransactionList;
