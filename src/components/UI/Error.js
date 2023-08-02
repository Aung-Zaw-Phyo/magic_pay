import React from "react";

const Error = (props) => {
    const classes = `${props.className} w-full p-3 mb-2 rounded bg-gray-100 text-center text-[red]`
  return <>
     {props.error && <div className={classes}>{props.error}</div>}
  </>;
};

export default Error;
