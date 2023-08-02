import React from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import {BsFillFilterSquareFill} from 'react-icons/bs'
import { useFetcher } from "react-router-dom";

const options = [
    { value: '', label: 'All' },
    { value: 1, label: 'Income' },
    { value: 2, label: 'Expense' },
];

const Filter = (props) => {
    const fetcher = useFetcher()
    return (
        <div className="bg-white p-4 mb-3">
        <h1 className="text-[18px] font-semibold mb-3 flex items-center m-1">
            <BsFillFilterSquareFill size={20} className="text-black/60 me-2"/>
            <span>Filter</span>
        </h1>
        <div className=" grid md:grid-cols-2 gap-3">
            <div className="m-1 flex items-center">
                <span className="bg-black/60 mr-[-3px] rounded-s text-white px-2 h-[40px] flex justify-center items-center">Date</span>
                <DatePicker 
                    disabled={fetcher.state === 'loading' ? true : false}
                    placeholderText="All"
                    className="rounded w-full outline-none border-[1.5px] border-gray-400 h-[40px] p-2 focus:border-[#5842e3] duration-300"
                    selected={props.date} 
                    dateFormat="yyyy-MM-dd" 
                    onChange={(date) => props.onDateChangeHandler(date)}
                />
            </div>
            <div className="m-1 flex items-center">
                <span className="bg-black/60 mr-[-3px] rounded-s text-white px-2 h-[40px] flex justify-center items-center">Type</span>
                <Select
                    isDisabled={fetcher.state === 'loading' ? true : false}
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            height: '40px',
                            borderColor: state.isFocused ? "#5842e3" : "rgb(156 163 175)",
                            boxShadow: state.isFocused ? "none" : "none",
                            borderRadius: "5px",
                            width: '100%',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected ? "#5842e3" : "white",
                        }),
                    }}
                    className="w-full duration-300"
                    defaultValue={options[0]}
                    onChange={(type) => props.onTypeChangeHandler(type)}
                    options={options}
                />
            </div>
        </div>
    </div>
    );
};

export default Filter;
