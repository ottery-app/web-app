import { PropsWithChildren } from "react";
import Head from "./Head";
import Hint from "../../../../../../ottery-ui/containers/Hint";
import { View } from "react-native";
import Button from "../../../../../../ottery-ui/buttons/Button";

function HelpWrapper({
  title,
  children,
}: PropsWithChildren & { title?: string }) {
  return (
    <View>
      {title && <Head>{title}</Head>}
      <Hint peak="Identification and emergency contacts are provided by default" />
      {children}
    </View>
  );
}

export default HelpWrapper;
