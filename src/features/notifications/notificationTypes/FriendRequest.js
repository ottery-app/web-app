import { Main } from "../../../components/Main";
import { Link } from "../../../../ottery-ui/text/Link";
import paths from "../../../router/paths";
import { useNavigator } from "../../../router/useNavigator";
import { useEffect } from "react";
import { Text } from "react-native";

export function FriendRequest({ notif, setCallback }) {
  const navigator = useNavigator();

  useEffect(() => {
    setCallback(() => () => {
      navigator(paths.user.profile, { userId: notif.sender.id });
    });
  }, [notif]);

  return (
    <Text>
      <Link>{notif.message}</Link>
    </Text>
  );
}
