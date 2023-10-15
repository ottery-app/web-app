// import Snackbar from '@mui/material/Snackbar';
// import { createContext, useCallback, forwardRef, useContext, useState, useMemo } from "react";
// import MuiAlert from '@mui/material/Alert';
// import { MainHeaderHeight } from '../ottery-ui/headers/MainHeader';
// import { useAuthClient } from '../features/auth/useAuthClient';

// const Alert = forwardRef(function Alert(props, ref) {
//     return <MuiAlert sx={{ width: '100%' }} elevation={6} ref={ref} variant="filled" {...props} />;
// });

// const PingContext = createContext();

// export const AlertColor = {
//     success: 'success',
//     info: 'info',
//     warning: 'warning',
//     error: 'error',
// }

// const BASE_OPTIONS = {
//     open: false,
//     message: "Default message",
//     autoHideDuration: 4000,
//     severity: AlertColor.info,
// }

// export function PingProvider({children}) {
//     const sesh = useAuthClient().useSesh();
//     const [options, setOptions] = useState(BASE_OPTIONS);

//     const margin = useMemo(()=>{
//         if (sesh.loggedin && sesh.activated) {
//             return MainHeaderHeight;
//         } else {
//             return 0;
//         }
//     }, [sesh]);

//     const success = useCallback((message) => {
//         console.log(message);
    
//         setOptions((prevOptions) => ({
//             ...prevOptions,
//             open: true,
//             message,
//             severity: AlertColor.success,
//         }));
//     }, []);
    
//     const info = useCallback((message) => {
//         console.log(message);
    
//         setOptions((prevOptions) => ({
//             ...prevOptions,
//             open: true,
//             message,
//             severity: AlertColor.info, // Change to info
//         }));
//     }, []);
    
//     const warning = useCallback((message) => {
//         console.warn(message);
    
//         setOptions((prevOptions) => ({
//             ...prevOptions,
//             open: true,
//             message,
//             severity: AlertColor.warning,
//         }));
//     }, []);
    
//     const error = useCallback((message) => {
//         console.error(message);
    
//         setOptions((prevOptions) => ({
//             ...prevOptions,
//             open: true,
//             message,
//             severity: AlertColor.error,
//         }));
//     }, []);
    

//     const handleClose = useCallback((event, reason)=>{
//         if (reason === 'clickaway') {
//             return;
//         }
      
//         setOptions((options)=>{
//             return {...options, open:false}
//         });
//     }, []);

//     return (
//         <PingContext.Provider
//             value={{
//                 success,
//                 error,
//                 warning,
//                 info,
//             }}
//         >
//             <Snackbar 
//                 anchorOrigin={{horizontal:"left", vertical:"top"}} 
//                 open={options.open} 
//                 autoHideDuration={options.autoHideDuration}
//                 onClose={handleClose}
//                 style={{ marginTop: margin }}
//             >
//                 <Alert 
//                     onClose={handleClose}
//                     severity={options.severity} 
//                 >
//                     {options.message}
//                 </Alert>
//             </Snackbar>
//             {children}
//         </PingContext.Provider>
//     );
// }

// export function usePing() {
//     return useContext(PingContext);
// }

// export function useUpdateMargin() {
//     return useContext(PingContext).setMargin;
// }