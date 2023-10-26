import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { getInfo } from "../../user/userApi";
import { FriendRequest } from "./FriendRequest";
import { margin } from "../../../../ottery-ui/styles/margin";
import { Time } from "../../../../ottery-ui/text/Time";
import { dtoAssign, notification, NotificationDto } from "@ottery/ottery-dto";
import { Colors } from "react-native-paper";

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

  if (err) {
    console.error(err);
    return null;
  } else {
    return (
      <Button
        icon={({ color, size }) => (
          <Image
            source={{ uri: user?.pfp?.src }}
            style={{ width: size, height: size, borderRadius: size / 2 }}
          />
        )}
        contentStyle={{ backgroundColor: Colors.lightBlue500 }}
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
