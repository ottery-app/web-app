import { Provider } from "react-redux";
import { store } from "./store";
import { queryClient } from "./queryClient";
import { QueryClientProvider } from "react-query";
import { ThemeProvider } from "../../ottery-ui/styles/Color";
import { PingProvider } from "../../ottery-ping";
import { NavigatorProvider } from "../router/useNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Preloader } from "./Preloader";
import { AwaitGlobalLoad } from "../queryStatus/AwaitLoadGlobal";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Preloader>
            <AwaitGlobalLoad>
              <PingProvider>
                <NavigatorProvider>
                  <SafeAreaProvider>{children}</SafeAreaProvider>
                </NavigatorProvider>
              </PingProvider>
            </AwaitGlobalLoad>
          </Preloader>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
