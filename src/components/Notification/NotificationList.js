import React, { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import NotificationItem from "./NotificationItem";
import Paginate from "../UI/Paginate";

const NotificationList = (props) => {
    const [notifications, setNotificatioins] = useState([])
    const [prevPage, setPrevPage] = useState(null)
    const [nextPage, setNextPage] = useState(null)
    const fetcher = useFetcher()
    const notificationsData = props.data;

    useEffect(() => {
        setPrevPage(notificationsData.links.prev)
        setNextPage(notificationsData.links.next)
        setNotificatioins(notificationsData.data)
    }, [notificationsData])

    useEffect(() => {
        const fetcherData = fetcher.data
        if (fetcher.state === "idle" && fetcherData) {
            setPrevPage(fetcherData.notifications.links.prev)
            setNextPage(fetcherData.notifications.links.next)
            setNotificatioins(fetcherData.notifications.data)
        }
    }, [fetcher])

    return (
        <>
            <h1 className="text-[18px] font-semibold mb-3">Notifications</h1>
            {
                fetcher.state === 'loading' && <p className="text-center mb-3">Loading ...</p>
            }
            {
                notifications.map(notification => (
                    <NotificationItem notification={notification} key={notification.id}/>
                ))
            }
            
            {/* Pagination */}
            <Paginate fetcher={fetcher} prevPage={prevPage} nextPage={nextPage} route="/notification?index&link=" />
            
        </>
    );
};

export default NotificationList;
