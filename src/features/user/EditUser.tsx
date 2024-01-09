import { FormFlag, ImageDto } from "@ottery/ottery-dto";
import { Main } from "../../../ottery-ui/containers/Main";
import { useAuthClient } from "../auth/useAuthClient";
import { useFormClient } from "../form/useFormClient";
import { useUserClient } from "./useUserClient";
import ImageInput from "../../../ottery-ui/input/ImageInput";
import { useState } from "react";
import { pfp as pfpAsset } from "../../../assets/icons";

export function EditUser() {
    const userId = useAuthClient().useUserId();

    const userRes = useUserClient().useGetUserInfo({inputs:[userId]});
    const user = userRes?.data?.data[0];
    const userDataRes = useUserClient().useGetUserData({inputs:[userId]});
    const userData = userDataRes?.data?.data;

    const updateFirstName = useUserClient().useUpdateFirstName();
    const updateLastName = useUserClient().useUpdateLastName();

    function updateProfilePhoto(image:ImageDto) {
        user.pfp;
    }

    //data to collect:
    // - first name
    // - last name
    // - pfp (if no security photo data)
    // dataFields

    //const [pfp, setPfp] = useState();

    console.log(user);
    
    return <Main>
        <ImageInput value={user.pfp} onChange={updateProfilePhoto} />

    </Main>
    return "test";
}