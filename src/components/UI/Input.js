import React from "react";

const Input = (props) => {
    const focus = props.focus
    const type = props.type
    const name = props.name;
    const label = props.label;
    const conditionalLabel = props.conditionalLabel
    const changeHandler = props.onChange;
    const blurHandler = props.onBlur;
    const value = props.value
    const error = props.error
    const inputClasses = `${props.className} block rounded w-full outline-none border-[1.5px] border-gray-400 h-[40px] p-2 focus:border-[#5842e3] duration-300`
    return (
        <div className="mb-3 w-full">
            <div  className="block mb-2">
                <label htmlFor={name} className="me-4">{label}</label>
                <span className="text-[red]">{conditionalLabel && '( ' + conditionalLabel + ' )'}</span>
            </div>
            <input type={type} id={name} name={name} autoFocus={focus}
                onChange={changeHandler} onBlur={blurHandler} value={value} 
                className={inputClasses}
            />
            {
                error && <p className="mt-1 text-red-700">Please enter a valid {name}.</p>
            }
        </div>
    );
};

export default Input;
