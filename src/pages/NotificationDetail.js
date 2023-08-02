import React, { Suspense } from "react";
import { getToken } from "../utils/auth";
import { Await, defer, useAsyncError, useLoaderData } from "react-router-dom";
import Detail from "../components/Notification/Detail";

const Error = () => {
    const error = useAsyncError()
    console.log(error)
    const message = error.message || 'Something wrong.'

    return <p className="text-center text-[red]">{message}</p>
}

const NotificationDetail = () => {
    const loadedData = useLoaderData()
    return (
        <Suspense fallback={<p className="text-center">Loading ...</p>}>
            <Await resolve={loadedData.notification} errorElement={<Error/>} >
                {(data) => <Detail data={data.data} />}
            </Await>
        </Suspense>
    );
};

export default NotificationDetail;

const notificationLoader = async (request, params) => {
    const noti_id = params.noti_id
    const response = await fetch('http://localhost:8000/api/notification/' + noti_id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    })

    if(response.status === 404) {
        const resData = await response.json()
        throw resData
    }

    if(!response.ok) {
        throw response
    }

    const resData = await response.json()
    return resData
}

export const loader = ({request, params}) => {
    return defer({
        notification: notificationLoader(request, params)
    })
}