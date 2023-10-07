import { useEffect, useMemo } from "react";
import { Loading } from "../router/Loading";
import { Error } from "../router/Error";

/**
 * This can be used with react Query
 */
export function AwaitLoad({
    status,
    loadingHtml = <Loading/>,
    errorHtml = <Error/>,
    successHtml,
    onLoading,
    onError,
    onSuccess,
    children,
}) {
    const statusArr = useMemo(()=>(Array.isArray(status)) ? status : [status], [status])

    useEffect(()=>{
        if (statusArr.includes("error")) {
            onError && onError();
        } else if (statusArr.includes("loading")) {
            onLoading && onLoading();
        } else if (statusArr.every(val=>val==="success" || val==="idle")) {
            onSuccess && onSuccess();
        } else {
            console.error("Something unsupported occured");
        }
    }, [status]);

    if (statusArr.includes("error")) {
        return errorHtml;
    } else if (statusArr.includes("loading")) {
        return loadingHtml;
    } else if (statusArr.every(val=>val==="success" || val==="idle")) {
        return successHtml || children;
    } else {
        console.error("Something unsupported occured");
    }
}