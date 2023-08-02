import React from "react";

const Paginate = (props) => {
    const prevHandler = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        props.fetcher.load(props.route + props.prevPage)
    }

    const nextHandler = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        props.fetcher.load(props.route + props.nextPage)
    }

    return (
        <div className="mt-5 text-center">
            {props.prevPage && (
                <button onClick={prevHandler} className="px-2 py-1 m-2 bg-transparent tracking-wide text-[#5842e3] border-[1px] border-[#5842e3] hover:text-white hover:border-transparent duration-300">
                    Prev
                </button>
            )}
            {props.nextPage && (
                <button onClick={nextHandler} className="px-2 py-1 m-2 bg-transparent tracking-wide text-[#5842e3] border-[1px] border-[#5842e3] hover:text-white hover:border-transparent duration-300">
                    Next
                </button>
            )}
        </div>
    );
};

export default Paginate;
