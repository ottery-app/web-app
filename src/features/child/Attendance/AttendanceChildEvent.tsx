import React, { useMemo } from "react";
import { useAttendanceClient } from "../../../attendance/useAttendanceClient";
import { useEventClient } from "../../event/useEventClient";
import { useChildClient } from "../useChildClient"
import { Main } from "../../../../ottery-ui/containers/Main";
import { IconHeader } from "../../../../ottery-ui/headers/IconHeader";
import {DateFormat, Time} from "../../../../ottery-ui/text/Time"
import { Text } from "react-native-paper";
import { View } from "react-native";
import { AttendanceDto } from "@ottery/ottery-dto";
import { margin } from "../../../../ottery-ui/styles/margin";
import { colors } from "../../../../ottery-ui/styles/colors";
import { fadedStyle, fadedVariant } from "../../event/tempzone/tempzone.style";

export function AttendanceChildEvent({route}) {
    const childRes = useChildClient().useGetChild({inputs:[route.params.childId]});
    const eventRes = useEventClient().useGetEvent({inputs:[route.params.eventId]});
    const attendanceRes = useAttendanceClient().useGetChildAtEvent({inputs:[route.params.childId, route.params.eventId]});

    const child = useMemo(()=>childRes?.data?.data, [childRes]);
    const event = useMemo(()=>eventRes?.data?.data, [eventRes]);
    const attendance = useMemo(()=>attendanceRes?.data?.data, [attendanceRes]);

    return (
        <Main margins={false} scrollable={false}>
            <IconHeader 
                src={child?.pfp}
                alt="profile photo"
                title={`${child?.firstName} ${child?.lastName}`}
                subTitle={`${event?.summary} Attendance`}
            />
            {(attendance?.length ===0)
                ? <Text style={[fadedStyle]} variant={fadedVariant}>{child?.firstName} has not attended {event?.summary}</Text>
                : <Main margins={false}>
                    {attendance?.map((attendance:AttendanceDto, i)=>
                        <View style={{
                            justifyContent:"space-between", 
                            alignItems:"center", 
                            flexDirection:"row",
                            padding: margin.medium,
                            backgroundColor: (i % 2 === 1) ? colors.background.primary : colors.background.secondary,
                        }}>
                            <Time time={attendance.date} type={DateFormat.mdy}/><Text>{attendance.status}</Text>
                        </View>
                    )}
                </Main>
            }
        </Main>
    );
}