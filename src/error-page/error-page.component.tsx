import {isRouteErrorResponse, useRouteError} from "react-router-dom";

export const ErrorPage = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return <p>{error.status} {error.statusText}</p>
    }

    return <p>{"Unknown Error"}</p>

}