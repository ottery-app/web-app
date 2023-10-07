import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AwaitContext = createContext();

export function QueryStatusProvider({children}) {
    const [status, setStatus] = useState([]);

    const updateStatus = useCallback((key, status) => {
        key = JSON.stringify(key);

        setTimeout(()=>{
            setStatus(p=>{

                for (let i = 0; i < p.length; i++ ) {
                    if (p[i].key === key) {
                        if (p[i].status !== status) {
                            p[i].status = status;
                            return [...p];
                        }
                        return p;
                    }
                }
    
                return [...p, {key, status}];
            });
        }, 1);
    }, []);

    const clearStatus = useCallback(()=>setStatus([]), []);

    return (
        <AwaitContext.Provider
            value={{
                status: status.map(store=>store.status),
                updateStatus,
                clearStatus,
            }}
        >
            {children}
        </AwaitContext.Provider>
    );
}

export function useQueryStatus() {
    const {
        status,
        updateStatus,
        clearStatus
    } = useContext(AwaitContext);

    useEffect(()=>clearStatus, []);

    return {
        status,
        updateStatus,
    }
}