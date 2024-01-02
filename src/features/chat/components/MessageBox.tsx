import { Dimensions, StyleSheet, Text, View } from "react-native";
import { radius } from "../../../../ottery-ui/styles/radius";
import { colors } from "../../../../ottery-ui/styles/colors";
import { margin } from "../../../../ottery-ui/styles/margin";
import { shadows } from "../../../../ottery-ui/styles/shadow";
import { DateFormat, Time } from "../../../../ottery-ui/text/Time";

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
          (self) ? { backgroundColor: colors.secondary.main } : {backgroundColor: colors.background.primary}
        ]}
      >
        <Text>{content}</Text>
      </View>
      <Time color={colors.text.tertiary} time={date} type={DateFormat.smallest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexBasis: "auto",
    gap: margin.small,
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
