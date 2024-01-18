import { StyleSheet, View } from "react-native";
import { DataFieldDto, FormFlag, ImageDto } from "@ottery/ottery-dto";

import { Main } from "../../../ottery-ui/containers/Main";
import { useAuthClient } from "../auth/useAuthClient";
import { useFormClient } from "../form/useFormClient";
import { useUserClient } from "./useUserClient";
import ImageInput from "../../../ottery-ui/input/ImageInput";
import { useEffect, useMemo, useRef, useState } from "react";
import { pfp as pfpAsset } from "../../../assets/icons";
import { Text } from "react-native-paper";
import Button from "../../../ottery-ui/buttons/Button";
import TextInput from "../../../ottery-ui/input/TextInput";
import { FormFieldToInput } from "../form/FormFieldToInput";
import { usePing } from "../../../ottery-ping";
import { useNavigator } from "../../router/useNavigator";

export function EditUser() {
  const userId = useAuthClient().useUserId();
  const navigator = useNavigator();

  const userRes = useUserClient().useGetUserInfo({ inputs: [userId] });
  const user = userRes?.data?.data[0];
  const userDataRes = useUserClient().useGetUserData({ inputs: [userId] });
  const userData = userDataRes?.data?.data;

  const Ping = usePing();

  const updateFirstName = useUserClient().useUpdateFirstName();
  const updateLastName = useUserClient().useUpdateLastName();
  const updatePhoto = useUserClient().useUpdateProfilePhoto();
  const updateData = useUserClient().useUpdateUserData();

  //data to collect:
  // - first name
  // - last name
  // - pfp (if no security photo data)
  // dataFields

  const [pfp, setPfp] = useState<ImageDto>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dataFields, setDataFields] = useState<DataFieldDto[]>([]);

  const prevPfpRef = useRef<ImageDto>();
  const prevFirstNameRef = useRef("");
  const prevLastNameRef = useRef("");
  const prevDataRef = useRef("");

  const isPfpChanged = useMemo(() => {
    return JSON.stringify(pfp) !== JSON.stringify(prevPfpRef.current);
  }, [pfp]);

  const isFirstNameChanged = useMemo(() => {
    return firstName !== prevFirstNameRef.current;
  }, [firstName]);

  const isLastNameChanged = useMemo(() => {
    return lastName !== prevLastNameRef.current;
  }, [lastName]);

  const isDataChanged = useMemo(() => {
    return JSON.stringify(dataFields) !== JSON.stringify(prevDataRef.current);
  }, [JSON.stringify(dataFields)]);

  useEffect(() => {
    if (user) {
      // Save original values
      prevPfpRef.current = user.pfp;
      prevFirstNameRef.current = user.firstName;
      prevLastNameRef.current = user.lastName;

      setPfp(user.pfp);
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      // Save original data
      prevDataRef.current = userData;

      setDataFields(userData);
    }
  }, [userData]);

  function changePhoto(newImage: ImageDto) {
    setPfp(newImage);
  }

  function changeFirstName(newFirstName: string) {
    setFirstName(newFirstName);
  }

  function changeLastName(newLastName: string) {
    setLastName(newLastName);
  }

  function changeFieldData(fieldIndex: number) {
    return function (val: DataFieldDto) {
      const updatedDataFields = [...dataFields];
      updatedDataFields[fieldIndex] = val;
      setDataFields(updatedDataFields);
    };
  }

  async function submit() {
    try {
      if (isPfpChanged) {
        await updatePhoto.mutateAsync({ pfp, userId });
      }

      if (isFirstNameChanged) {
        await updateFirstName.mutateAsync({ userId, firstName });
      }

      if (isLastNameChanged) {
        await updateLastName.mutateAsync({ userId, lastName });
      }

      if (isDataChanged) {
        await updateData.mutateAsync({ userId, dataFields });
      }

      navigator(-1);
    } catch (error) {
      Ping.error("Update failed");
    }
  }

  return (
    <Main>
      <View style={styles.row}>
        <Text variant="bodyMedium">Personal Info</Text>
        <Button onPress={submit}>Save</Button>
      </View>
      <View style={styles.row}>
        <ImageInput value={pfp || pfpAsset} onChange={changePhoto} />
        <View>
          <TextInput
            label="First name"
            value={firstName}
            onChange={changeFirstName}
          />
          <TextInput
            label="Last name"
            value={lastName}
            onChange={changeLastName}
          />
        </View>
      </View>
      <View>
        <Text variant="bodyMedium">Form Data</Text>
        {dataFields?.map((dataField: DataFieldDto, index: number) => (
          <FormFieldToInput
            key={index}
            formField={dataField}
            value={dataField}
            onChange={changeFieldData(index)}
          />
        ))}
      </View>
    </Main>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
