import React from "react";
import noti_img from './../../images/notification.png'
import { Link } from "react-router-dom";

const Detail = ({data}) => {
    const forward_link = data.deep_link.target === 'profile' ? '/profile' : `/transaction/${data.deep_link.parameter.trx_id}`
    return (
        <div className="bg-white p-4 rounded-lg flex flex-col items-center">
            <img className="w-[220px]" src={noti_img} alt="" />
            <p className="mb-2 text-[17px]">{data.title}</p>
            <p className="mb-2">{data.message}</p>
            <p className="mb-4 text-[14px] text-black/60">{data.date_time}</p>
            <Link to={forward_link}><button>Continue</button></Link>
        </div>
    );
};

export default Detail;
