import { PropsWithChildren } from "react";
import Main from "./Main";
import Head from "./Head";
import Hint from "../../../../../../ottery-ui/containers/Hint";

function HelpWrapper({
  title,
  children,
}: PropsWithChildren & { title?: string }) {
  return (
    <Main>
      {title && <Head>{title}</Head>}
      <Hint peak="Identification and emergency contacts are provided by default" />
      {children}
    </Main>
  );
}

export default HelpWrapper;
