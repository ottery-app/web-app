import { useNavigation } from "@react-navigation/native";

export function useNavigator() {
  const navigation = useNavigation();

  return function navigator(path, params) {
    navigation.navigate(path, params);
  };
}
