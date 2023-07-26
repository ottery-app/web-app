import { useMutation } from "react-query";

/**
 * this is used to add:
 * onSuccessIn
 */
export function makeUseMutation(defaultOptions) {
    return (options=defaultOptions)=>{
        if (defaultOptions.onSuccessAlways) {
            const oldOnSuccess = options.onSuccess;
            options.onSuccess = (data)=>{
                defaultOptions.onSuccessAlways(data);
                return (oldOnSuccess) ? oldOnSuccess(data) : data;
            }
        }
        return useMutation(defaultOptions.mutationFn, options)
    };
}