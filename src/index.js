import { View } from "react-native";
import Providers from "./provider/Providers"; 
import Router from "./router/Router";

export default function Ottery() {
    return (
        <Providers>
            <Router />
        </Providers>
    );
}