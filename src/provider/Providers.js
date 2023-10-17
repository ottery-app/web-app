import { Provider } from "react-redux"
import { store } from "./store"
import { queryClient } from "./queryClient"
import { QueryClientProvider } from "react-query"
import { ThemeProvider } from '../../ottery-ui/styles/Color';
import { PingProvider } from "../../ottery-ping";

export default function Providers({children}) {
    return(
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <PingProvider>
                        {children}
                    </PingProvider>
                </Provider>
            </QueryClientProvider>
        </ThemeProvider>
    )
}