import { Provider } from "react-redux";
import { store } from "./store";
import { queryClient } from "./queryClient";
import { QueryClientProvider } from "react-query";
import { ThemeProvider } from "../../ottery-ui/styles/Color";
import { PingProvider } from "../../ottery-ping";
import { NavigatorProvider } from "../router/useNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PingProvider>
            <NavigatorProvider>
              <SafeAreaProvider>{children}</SafeAreaProvider>
            </NavigatorProvider>
          </PingProvider>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
