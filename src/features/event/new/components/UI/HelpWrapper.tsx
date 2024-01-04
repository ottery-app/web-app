import { PropsWithChildren } from "react";
import Head from "./Head";
import { View } from "react-native";
import { margin } from "../../../../../../ottery-ui/styles/margin";

function HelpWrapper({
  title,
  hint,
  children,
}: PropsWithChildren & { title:string, hint:string }) {
  return (
    <View>
      {title && <Head style={{paddingBottom:margin.large}}>{title}</Head>}
      {/* <Hint peak={hint} /> */}
      {children}
    </View>
  );
}

export default HelpWrapper;
