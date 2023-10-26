import { Dimensions, StyleSheet, Text, View } from "react-native";
import { radius } from "../styles/radius";
import { colors } from "../styles/colors";
import { margin } from "../styles/margin";
import { shadows } from "../styles/shadow";
import { DateFormat, Time } from "../text/Time";

const windowWidth = Dimensions.get("window").width;

interface MessageBoxProps {
  date: number;
  content: string;
  self?: boolean;
}

function MessageBox({ self = false, date, content }: MessageBoxProps) {
  return (
    <View style={[styles.container, self && { alignItems: "flex-end" }]}>
      <View
        style={[
          styles.content,
          self && { backgroundColor: colors.secondary.main },
        ]}
      >
        <Text>{content}</Text>
      </View>
      <Time color={colors.text.tertiary} time={date} type={DateFormat.time} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: margin.small
  },
  content: {
    padding: margin.medium,
    backgroundColor: colors.background.secondary,
    borderRadius: radius.default,
    maxWidth: windowWidth / 2.5,
    ...shadows.default,
  },
});

export default MessageBox;
