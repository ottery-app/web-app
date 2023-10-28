import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { getInfo } from "../../user/userApi";
import { FriendRequest } from "./FriendRequest";
import { margin } from "../../../../ottery-ui/styles/margin";
import { Time } from "../../../../ottery-ui/text/Time";
import { dtoAssign, notification, NotificationDto } from "@ottery/ottery-dto";
import { colors } from "../../../../ottery-ui/styles/colors";
import Image from "../../../../ottery-ui/image/Image";
import { image } from "../../../../ottery-ui/styles/image";
import { radius } from "../../../../ottery-ui/styles/radius";

const styles = StyleSheet.create({
  mainNotif: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    padding: margin.small,
  },
  head: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  from: {
    fontWeight: "bold",
  },
});

export function Notification({ raw }) {
  const [user, setUser] = useState();
  const [err, setError] = useState(false);
  const [callback, setCallback] = useState(() => {});

  const notif = useMemo(() => dtoAssign(NotificationDto, raw), [raw]);

  useEffect(() => {
    if (notif?.sender?.id) {
      getInfo(notif?.sender?.id)
        .then((res) => {
          setUser(res.data[0]);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [notif]);

  let body = undefined;

  if (notif.type === notification.friendrequest) {
    body = <FriendRequest setCallback={setCallback} notif={notif} />;
  } else {
    console.error("notification type is not yet supported");
    return null;
  }

  console.log(user?.pfp)

  if (err) {
    console.error(err);
    return null;
  } else {
    return (
      <Button
        icon={({ color, size }) => (
          <Image
            src = {{src : user?.pfp?.src, aspectRatio:user?.pfp?.aspectRatio || 1 }}
            width={image.smallProfile}
          />
        )}
        contentStyle={{
          main: colors.background.primary,
          dark: colors.background.primary,
          contrastText: colors.text.primary,
        }}
        style={{ borderRadius: 0 }}
        onPress={callback}
      >
        <View style={styles.mainNotif}>
          <View style={styles.head}>
            <Text>
              <Text style={styles.from}>
                {user?.firstName} {user?.lastName}
              </Text>
            </Text>
            <Text>
              <Time time={notif.time} type={"date"} />
            </Text>
          </View>
          <View>
            {" "}
            {/* This is just here in case an internal body is just a string, it protects the structure a bit */}
            {body}
          </View>
        </View>
      </Button>
    );
  }
}
