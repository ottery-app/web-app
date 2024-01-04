import { PropsWithChildren } from "react";
import Head from "./Head";
import { View } from "react-native";

function HelpWrapper({
  title,
  hint,
  children,
}: PropsWithChildren & { title:string, hint:string }) {
  return (
    <View>
      {title && <Head>{title}</Head>}
      {/* <Hint peak={hint} /> */}
      {children}
    </View>
  );
}

export default HelpWrapper;
