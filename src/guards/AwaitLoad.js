import { useEffect } from "react";
import { Loading } from "../router/Loading";
import { Error } from "../router/Error";

export function AwaitLoad(props) {
    let status = [];

    if (!Array.isArray(props.status)) {
        status = [props.status];
    } else {
        status = props.status;
    }

    let topStatus = status.pop();

    if (status.length) {
        return (
            <AwaitLoadSingle {...props} status={topStatus}>
                <AwaitLoad {...props} />
            </AwaitLoadSingle>
        );
    } else {
        return <AwaitLoadSingle {...props} status={topStatus}/>
    }
}

function AwaitLoadSingle({
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