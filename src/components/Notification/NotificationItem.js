import React from "react";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";

const NotificationItem = ({notification}) => {
    return (
        <Link to={`/notification/${notification.id}`} className="bg-white p-4 rounded-lg mb-2 block hover:text-[#5842e3] duration-300">
            <div className="flex items-center mb-2">
                <IoMdNotifications size={20} className={`${notification.read === 0 && 'text-[red]'} me-2`} />
                <span className="text-[17px]">{notification.title}</span>
            </div>
            <p className="mb-1">
                {notification.message}
            </p>
            <p className="text-black/60 text-[14px]">{notification.date_time}</p>
        </Link>
    );
};

export default NotificationItem;
