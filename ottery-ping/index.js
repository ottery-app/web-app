import { 
    createContext,
    useCallback,
    useContext,
    useState
} from "react";

import { Snackbar, Button, useTheme } from 'react-native-paper';
import useColors from "../ottery-ui/styles/useColors";
import { colors } from "../ottery-ui/styles/colors";


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
    //const sesh = useAuthClient().useSesh();
    const [options, setOptions] = useState(BASE_OPTIONS);
    const color = useColors({status: options.severity});

    const success = useCallback((message) => {
        console.log(message);
    
        setOptions((prevOptions) => ({
            ...prevOptions,
            open: true,
            message,
            severity: AlertColor.success,
            label: "close",
        }));
    }, []);
    
    const info = useCallback((message) => {
        console.log(message);
    
        setOptions((prevOptions) => ({
            ...prevOptions,
            open: true,
            message,
            severity: AlertColor.info,
            label: "close",
        }));
    }, []);
    
    const warning = useCallback((message) => {
        console.warn(message);
    
        setOptions((prevOptions) => ({
            ...prevOptions,
            open: true,
            message,
            severity: AlertColor.warning,
            label: "close",
        }));
    }, []);
    
    const error = useCallback((message) => {
        console.error(message);
    
        setOptions((prevOptions) => ({
            ...prevOptions,
            open: true,
            message,
            severity: AlertColor.error,
            label: "close",
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
            {children}
            <Snackbar
                visible={options.open}
                onDismiss={handleClose}
                duration={options.autoHideDuration}
                action={{
                    label: options.label,
                    textColor: color?.contrastText,
                    onPress: handleClose,
                }}
                style={{
                    backgroundColor: color?.main,
                    color: color?.contrastText,
                }}
            >
                {options.message}
            </Snackbar>
        </PingContext.Provider>
    );
}

export function usePing() {
    return useContext(PingContext);
}