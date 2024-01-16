import { MultiFieldHeader } from "../../../ottery-ui/headers/MultiFieldHeader";
import { useMemo, useState } from "react";
import { ImageButton } from "../../../ottery-ui/buttons/ImageButton";
import { ImageButtonList } from "../../../ottery-ui/containers/ImageButtonList";
import { pfp, pluss } from "../../../assets/icons";
import { useNavigator } from "../../router/useNavigator";
import paths from "../../router/paths";
import { useChildClient } from "./useChildClient";
import { useUserClient } from "../user/useUserClient";
import { useAuthClient } from "../auth/useAuthClient";
import { useChatClient } from "../chat/useChatClient";
import { colors } from "../../../ottery-ui/styles/colors";
import { Text } from "react-native-paper";
import { useEventClient } from "../event/useEventClient";
import React from "react";
import { Main } from "../../../ottery-ui/containers/Main";
import { View } from "react-native";
import { DataFieldDto, FormFieldDto, inputType, noId } from "@ottery/ottery-dto";
import { margin } from "../../../ottery-ui/styles/margin";
import { SettingsOption } from "../../../ottery-ui/buttons/SettingsOption";

enum Tabs {
    events = "Events",
    info = "Info",
    guardians = "Guardians", 
}

function getYearDifference(date1, date2) {
    const diffInMilliseconds = Math.abs(date2 - date1);
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25; // Approximation for a year
  
    const yearsDifference = diffInMilliseconds / millisecondsInYear;
    return Math.floor(yearsDifference);
}

function DataRow({label, value}) {
    return <View style={{
        flexDirection:"row",
        justifyContent:"space-between",
    }}>
        <Text>{label}:</Text><Text>{value}</Text>
    </View>
}

export function ChildProfile({route}) {
    const navigator = useNavigator();

    const userId = useAuthClient().useUserId();
    const childId = route.params.childId;
    const childRes = useChildClient().useGetChild({inputs:[childId]});
    const childData = childRes?.data?.data;
    const childEventsIds = childData?.events;
    const childGuardiansRes = useUserClient().useGetUserInfo({
        inputs:[childData?.guardians],
        enabled: !!childData?.guardians,
    });
    const childGuardians = childGuardiansRes?.data?.data//.filter((guardian)=>guardian._id !== userId);
    const childGuardianIds = childGuardians?.map(guardian=>guardian._id);
    const chatIdsRes = useChatClient().useGetDirectChats({
        inputs:[userId, childGuardianIds],
        enabled: !!childGuardians,
    });
    const childEventsRes = useEventClient().useGetEvents({
        inputs: [childEventsIds],
        enabled: !!childEventsIds,
    })
    const childEvents = childEventsRes?.data?.data;
    const chatIdMap = chatIdsRes?.data;


    const [tab, setTab] = useState(Tabs.events);
    
    const display = {};

    display[Tabs.guardians] = useMemo(()=>{
        const primaryGuardian = childGuardians?.find(({_id})=>_id === childData.primaryGuardian);
        const guardians = childGuardians?.filter(({_id})=>_id !== childData.primaryGuardian);

        return <ImageButtonList>
            <>
                <Text variant="titleMedium">Primary Guardian:</Text>
                <ImageButton 
                    key={primaryGuardian?._id}
                    right={primaryGuardian?.pfp}
                    onPress={()=>{
                        if (primaryGuardian._id === userId) {
                            navigator(paths.main.user.profile, {userId})
                        } else {
                            navigator(paths.main.social.chat, {chatId: chatIdMap[primaryGuardian._id]})}}
                        }
                >
                    <Text>{primaryGuardian?.firstName} {primaryGuardian?.lastName}</Text>
                </ImageButton>
            </>
            <>
                <Text variant="titleMedium">Guardians:</Text>
                <ImageButton 
                    color={colors.success} 
                    right={pluss}
                    onPress={()=>{navigator(paths.main.child.addGuardian, {childId: childId})}}
                >
                    <Text>Add guardian</Text>
                </ImageButton>
                {
                    guardians?.map((guardian)=>{
                        return <ImageButton 
                            key={guardian._id}
                            right={guardian.pfp}
                            onPress={()=>navigator(paths.main.social.chat, {chatId: chatIdMap[guardian._id]})}
                        >
                            <Text>{guardian.firstName} {guardian.lastName}</Text>
                        </ImageButton>
                    })
                }
            </>
        </ImageButtonList>
    }, [childData, childGuardians, chatIdMap])

    display[Tabs.events] = useMemo(()=>{
        if (!childEvents) {
            return;
        }

        return <ImageButtonList>
            {childEvents.map((data)=>{
                return <ImageButton 
                    key={data._id}
                    onPress={()=>navigator(paths.main.event.dash, {eventId: data._id})}
                >
                    <Text>{data.summary}</Text>
                </ImageButton>
            })}
        </ImageButtonList>
    }, [childEvents, chatIdMap]);

    display[Tabs.info] = useMemo(()=>{
        return <Main style={{gap:margin.medium}}>
            <DataRow label={"Age"} value={getYearDifference(new Date(), new Date(childData?.dateOfBirth))}/>
            <DataRow label={"Gender"} value={childData?.gender}/>
            <DataRow label={"Location"} value={(()=>{
                if (childData?.lastStampedLocation?.at === noId) {
                    return "Home";
                }
                return childEvents?.find(({_id})=>_id === childData.lastStampedLocation.at)?.summary;
            })()}/>
            {childData?.data.map((formField:DataFieldDto)=>{
                console.log(formField);
                if (formField.type === inputType.PICTURE) return;
                return <DataRow label={formField.label} value={formField.value}/>
            })}
            <SettingsOption onPress={()=>navigator(paths.main.child.attendancePickEvent, {childId})}>Attendance</SettingsOption>
        </Main>
    }, [childData, childEvents]);

    return (
        <Main margins={false} scrollable={false}>
            <MultiFieldHeader
                src={childData?.pfp}
                title={childData?.firstName + " " + childData?.lastName}
                tab={tab}
                onTab={(tab)=>{setTab(tab)}}
                tabs={Object.values(Tabs)}
            />
            {display[tab]}
        </Main>
    );
}