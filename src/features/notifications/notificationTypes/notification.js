import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getInfo } from "../../user/userApi";
import { FriendRequest } from "./FriendRequest";
import { margin } from "../../../../ottery-ui/styles/margin";
import { Time } from "../../../../ottery-ui/text/Time";
import { dtoAssign, notification, NotificationDto } from "@ottery/ottery-dto";
import { colors } from "../../../../ottery-ui/styles/colors";
import Image from "../../../../ottery-ui/image/Image";
import { image } from "../../../../ottery-ui/styles/image";

const styles = StyleSheet.create({
  mainNotif: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    padding: margin.small,
    margin: margin.medium,
  },
  head: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    margin: margin.large, //TODO: we can import the multpx here
  },
  from: {
    fontWeight: "bold",
    color: "black",
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

  console.log(user?.pfp);

  if (err) {
    console.error(err);
    return null;
  } else {
    return (
      <TouchableOpacity
        contentStyle={{
          main: colors.background.primary,
          dark: colors.background.primary,
          contrastText: colors.text.primary,
        }}
        style={{ borderRadius: 0 }}
        onPress={callback}
      >
        <View style={styles.mainNotif}>
          <Image
            src={{
              src: user?.pfp?.src,
              aspectRatio: user?.pfp?.aspectRatio || 1,
            }}
            radius={image.smallProfile}
            width={image.smallProfile}
            height={image.smallProfile}
          />
          <View style={styles.head}>
            <Text>
              <Text style={styles.from}>
                {user?.firstName} {user?.lastName}
              </Text>
            </Text>
            <Text>
              <Time time={notif.time} type={"date"} />
            </Text>
            <View>
              {/* This is just here in case an internal body is just a string, it protects the structure a bit */}
              {body}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
