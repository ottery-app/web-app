import { ReactNode } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { radius } from "../styles/radius";
import { colors } from "../styles/colors";
import { margin } from "../styles/margin";
import { shadows } from "../styles/shadow";
import { TIME, Time } from "../text/Time";

const windowWidth = Dimensions.get("window").width;

interface MessageBoxProps {
  date: number;
  content: string;
  self?: boolean;
}

function MessageBox({ self = false, date, content }: MessageBoxProps) {
  return (
    <View style={[styles.container, self && { alignItems: "flex-end" }]}>
      <Time time={date} type={TIME.time} />
      <View
        style={[
          styles.content,
          self && { backgroundColor: colors.secondary.light },
        ]}
      >
        <Text>{content}</Text>
      </View>
    </View>
  );
}

// function Spread({ self, children }) {
//   return <View style={[styles.spread, self && "flex-end"]}>{children}</View>;
// }

// function Bubble({ self, children }) {
//   return <View style={styles.bubble}>{children}</View>;
// }

// function Message({ self = false, children }) {
//   return (
//     <Spread self={self}>
//       <Bubble self={self}>{children}</Bubble>
//     </Spread>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  content: {
    padding: margin.medium,
    backgroundColor: colors.background.secondary,
    borderRadius: radius.default,
    maxWidth: windowWidth / 2.5,
    ...shadows.default,
  },
  bubble: {
    // display: block;
    // box-sizing: border-box;
    // padding: ${margin.medium};
    // background: ${(props) =>
    //   props.self ? colors.secondary.light : colors.background.secondary};
    // border-radius: ${radius.default};
    // max-width: ${windowWidth / 2.5}px;
    // overflow-wrap: break-word;
    // ${shadows.default}
  },
});

export default MessageBox;
