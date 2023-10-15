import { Provider } from "react-redux"
import { store } from "./store"
import { queryClient } from "./queryClient"
import { QueryClientProvider } from "react-query"

export default function Providers({children}) {
    return(
        // <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
        {/* //         <PingProvider> */}
                    {children}
        {/* //         </PingProvider> */}
                 </Provider>
            </QueryClientProvider>
        // </ThemeProvider>
    )
}