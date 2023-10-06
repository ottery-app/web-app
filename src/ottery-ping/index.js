import Snackbar from '@mui/material/Snackbar';
import { createContext, useCallback, useContext, useState } from "react";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

//import MuiAlert from '@mui/material/Alert';

// const Alert = forwardRef(function Alert(
//   props,
//   ref,
// ) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const PingContext = createContext();

export const AlertColor = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
}

const BASE_OPTIONS = {
    open: false,
    message: "Default message",
    autoHideDuration: 1500,
    severity: AlertColor.info,
}

export function PingProvider({children}) {
    const [options, setOptions] = useState(BASE_OPTIONS);

    const success = useCallback((message)=>{
        console.log(message);
       
        setOptions({
            ...BASE_OPTIONS,
            open: true,
            message,
            severity: AlertColor.success,
        });
    }, []);

    const info = useCallback((message)=>{
        console.log(message);

        setOptions({
            ...BASE_OPTIONS,
            open: true,
            message,
            severity: AlertColor.success,
        });
    }, []);

    const warning = useCallback((message)=>{
        console.warn(message);

        setOptions({
            ...BASE_OPTIONS,
            open: true,
            message,
            severity: AlertColor.warning,
        });
    }, []);


    const error = useCallback((message)=>{
        console.error(message);

        setOptions({
            ...BASE_OPTIONS,
            open: true,
            message,
            severity: AlertColor.error,
        });
    }, []);

    const handleClose = useCallback((event, reason)=>{
        if (reason === 'clickaway') {
            return;
        }
      
        setOptions({...options, open:false});
    }, []);

    return (
        <PingContext.Provider
            value={{
                success,
                error,
                warning,
                info,
            }}
        >
            {children}
            <Snackbar open={options.open} autoHideDuration={options.autoHideDuration} onClose={handleClose}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert onClose={handleClose} severity={options.severity} sx={{ width: '100%' }}>
                        {options.message}
                    </Alert>
                </Stack>
            </Snackbar>
        </PingContext.Provider>
    );
}

export function usePing() {
    return useContext(PingContext);
}