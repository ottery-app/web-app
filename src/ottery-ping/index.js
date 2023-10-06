import Snackbar from '@mui/material/Snackbar';
import { createContext, useCallback, forwardRef, useContext, useState } from "react";
//import Alert from '@mui/material/Alert';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    autoHideDuration: 4000,
    severity: AlertColor.info,
}

export function PingProvider({children}) {
    const [options, setOptions] = useState(BASE_OPTIONS);

    const success = useCallback((message) => {
        console.log(message);
    
        setOptions((prevOptions) => ({
            ...prevOptions,
            open: true,
            message,
            severity: AlertColor.success,
        }));
    }, []);
    
    const info = useCallback((message) => {
        console.log(message);
    
        setOptions((prevOptions) => ({
            ...prevOptions,
            open: true,
            message,
            severity: AlertColor.info, // Change to info
        }));
    }, []);
    
    const warning = useCallback((message) => {
        console.warn(message);
    
        setOptions((prevOptions) => ({
            ...prevOptions,
            open: true,
            message,
            severity: AlertColor.warning,
        }));
    }, []);
    
    const error = useCallback((message) => {
        console.error(message);
    
        setOptions((prevOptions) => ({
            ...prevOptions,
            open: true,
            message,
            severity: AlertColor.error,
        }));
    }, []);
    

    const handleClose = useCallback((event, reason)=>{
        if (reason === 'clickaway') {
            return;
        }
      
        setOptions((options)=>{
            return {...options, open:false}
        });
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
            <Snackbar 
                anchorOrigin={{horizontal:"left", vertical:"top"}} 
                open={options.open} 
                autoHideDuration={options.autoHideDuration}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={options.severity} sx={{ width: '100%' }}>
                    {options.message}
                </Alert>
            </Snackbar>
            {children}
        </PingContext.Provider>
    );
}

export function usePing() {
    return useContext(PingContext);
}