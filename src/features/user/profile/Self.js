import { MultiFieldHeader } from "../../../ottery-ui/headers/MultiFieldHeader";
import OrderedList from "../../../ottery-ui/lists/OrderedList";
import ImageButton from "../../../ottery-ui/buttons/ImageButton";
import paths from "../../../router/paths";
import styled from "styled-components";
import { colors } from "../../../ottery-ui/styles/colors";
import { useMemo, useState } from "react";
import { useNavigator } from "../../../hooks/useNavigator";
import { MarginlessMain } from "../../../components/Main";
import { useUserClient } from "../useUserClient";
import { useSocialClient } from "../../social/useSocialClient";

const Tabs = {
  events: "events",
  kids: "kids",
  friends: "friends",
  //cars:"cars",
};

const ParentMargin = styled.div`
  width: 95%;
  margin: 5px;
`;

export default function UserSelf({ userInfo, userId }) {
  const navigator = useNavigator();
  const [tab, setTab] = useState(Tabs.events);
  const { useGetUserEvents, useGetUserChildren } = useUserClient();
  const { useGetFriends } = useSocialClient();
  const { data: eventsRes, status: eventStatus } = useGetUserEvents({
    inputs: [userId],
  });
  const { data: childrenRes, status: childrenStatus } = useGetUserChildren({
    inputs: [userId],
  });
  const { data: friendsRes, status: friendsStatus } = useGetFriends({
    inputs: [userId],
  });

  function formatChildrenButton(kiddo) {
    return (
      <ImageButton
        key={kiddo?._id}
        content={kiddo?.firstName}
        right={"pfp" && kiddo?.pfp.src}
        onClick={() => {
          navigator(paths.child.profile, { childId: kiddo?._id });
        }}
      />
    );
  }

  function formatEventButton(event) {
    return (
      <ImageButton
        key={event._id}
        content={event.summary}
        //right={"pfp" || event?.pfp?.src}
        onClick={() => {
          navigator(paths.event.dash, { eventId: event._id });
        }}
      />
    );
  }

  function formatFriendButton(user) {
    return (
      <ImageButton
        key={user?._id}
        content={`${user?.firstName} ${user?.lastName}`}
        right={"pfp" && user?.pfp?.src}
        onClick={() => {
          navigator(paths.user.profile, { userId: user._id });
        }}
      />
    );
  }

  const kidsButtons = useMemo(
    () => childrenRes?.data.map(formatChildrenButton),
    [childrenRes]
  );
  const eventsButtons = useMemo(
    () => eventsRes?.data.map(formatEventButton),
    [eventsRes]
  );
  const friendsButtons = useMemo(
    () => friendsRes?.data.map(formatFriendButton),
    [friendsRes]
  );

  const data = {};
  data[Tabs.kids] = kidsButtons;
  data[Tabs.events] = eventsButtons;
  data[Tabs.friends] = friendsButtons;

  if (tab === Tabs.kids) {
    var addAction = () => navigator(paths.child.new);
  } else if (tab === Tabs.events) {
    var addAction = () => navigator(paths.event.new);
  } else if (tab === Tabs.friends) {
    // Todo: redirect this page to search friends page, currently redirects to home page
    var addAction = () => navigator(paths.website.home);
  } else {
    //var addAction = ()=>Ping.alert("not set up yet...");
  }

  return (
    <MarginlessMain>
      <MultiFieldHeader
        src={userInfo?.pfp?.src || "pfp"}
        alt={"profile photo"}
        tab={tab}
        onTab={(tab) => {
          setTab(tab);
        }}
        tabs={Object.values(Tabs)}
        title={[
          `${userInfo?.firstName} ${userInfo?.lastName}`,
          // <Button
          //     type={BUTTON_TYPES.filled}
          //     primaryColor={colors.primaryLight}
          //     secondaryColor={colors.textDark}
          //     onClick={()=>{Ping.error("not yet done")}}
          // >Edit Profile</Button>,
          // <IconButton
          //     icon={ICON_NAMES.settings}
          //     onClick={()=>Ping.warn("not done yet")}
          // />
        ]}
      />
      <OrderedList title={tab} sort={(a, b) => a.key > b.key}>
        {data[tab]}
      </OrderedList>
      <ParentMargin>
        {tab === Tabs.events && (
          <ImageButton
            content="Add Event"
            right={"plus"}
            onClick={addAction}
            color={colors.success}
          />
        )}
        {tab === Tabs.kids && (
          <ImageButton
            content="Add Child"
            right={"plus"}
            onClick={addAction}
            color={colors.success}
          />
        )}
        {tab === Tabs.friends && (
          <ImageButton
            content="Search for friends"
            right={"search"}
            onClick={addAction}
            color={colors.tertiary}
          />
        )}
      </ParentMargin>
    </MarginlessMain>
  );
}
