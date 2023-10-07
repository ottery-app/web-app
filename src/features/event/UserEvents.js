import { useState, useEffect } from "react";
import OrderedList from "../../ottery-ui/lists/OrderedList";
import ImageButton from "../../ottery-ui/buttons/ImageButton";
import paths from "../../router/paths";
import {getEvents} from "../user/userApi";
import { useNavigator } from "../../hooks/useNavigator";

export default function UserEvents({
    userId,
}) {
    const [events, setEvents] = useState([]);
    const navigator = useNavigator();

    useEffect(()=>{
        getEvents(userId).then((res)=>{
            setEvents(res.data.map((event)=>{
                return <ImageButton
                    key={event._id}
                    content={event.summary}
                    onClick={()=>{
                        navigator(paths.event.event, {eventId:event._id});
                    }}
                />
            }));
        });
    }, []);

    return(
        <OrderedList
            title={"Events"}
            onClick={()=>{
                navigator(paths.event.new);
            }}
        >
            {events}
        </OrderedList>
    );
}