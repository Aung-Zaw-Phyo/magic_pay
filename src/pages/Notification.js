import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getToken } from "../utils/auth";
import NotificationList from "../components/Notification/NotificationList";

const Notification = () => {
    const loadedData = useLoaderData()
    return (
        <Suspense fallback={<p className="text-center">Loading ...</p>}>
            <Await resolve={loadedData.notifications} errorElement={<p className="text-center text-[red]">Something wrong!</p>}>
                {(data) => <NotificationList data={data} />}
            </Await>
        </Suspense>
    );
};

export default Notification;

const notificationsLoader = async(request, params) => {
    let url = 'http://localhost:8000/api/notification'
    const paginateLink = request.url.split('link=')[1]
    if (paginateLink) {
        url = paginateLink
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    })
    if(!response.ok) {
        return response
    }
    const resData = await response.json()
    return resData
}

export const loader = ({request, params}) => {
    return defer({
        notifications: notificationsLoader(request, params)
    })
}