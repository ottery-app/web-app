import { useEffect } from "react";
import { Loading } from "../router/Loading";
import { Error } from "../router/Error";

export function AwaitLoad({
    status,
    loadingHtml = <Loading/>,
    errorHtml = <Error/>,
    successHtml,
    onLoading,
    onError,
    onSuccess,
    children
}) {
    useEffect(()=>{
        switch (status) {
            case "loading":
                onLoading && onLoading();
                break;
            case "error":
                onError && onError();
                break;
            case "success":
                onSuccess && onSuccess();
                break;
        }
    }, [status]);

    switch (status) {
        case "loading":
            return loadingHtml;
        case "error":
            return errorHtml;
        case "success":
            return successHtml || children;
    }
}