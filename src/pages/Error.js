import { Link, useRouteError } from "react-router-dom"

const ErrorPage = () => {
    const error = useRouteError()
    console.log(error)
    let throwedMsg =  error.data ? error.data.message : null
    let title = 'An Error Occured!'
    let message = 'Something wrong.'

    if(error.status === 404) {
        message = throwedMsg ? throwedMsg :'Could not found resource or page.'
    }
    if(error.status === 422) {
        message = throwedMsg ? throwedMsg :'Validation failed.'
    }
    if(error.status === 403) {
        message = throwedMsg ? throwedMsg :'Unauthorized.'
    }
    if(error.status === 401) {
        message = throwedMsg ? throwedMsg : 'Unauthicated.'
    }
    if(error.status === 500) {
        message = throwedMsg ? throwedMsg : 'Something wrong.'
    }
    return (
        <>
            <div className="container py-12 text-center">
                <h1 className="text-xl md:text-3xl mb-6">{title}</h1>
                <h3 className="text-lg md:text-xl mb-6">{message}</h3>
            </div>
        </>
    )
}

export default ErrorPage