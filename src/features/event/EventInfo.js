import {useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import * as EventApi from './eventApi';
import styled from "styled-components";
import {margin} from "../../ottery-ui/styles/margin";
import { font } from "../../ottery-ui/styles/font";
import Button from "../../ottery-ui/buttons/Button";
import { copyText } from "../../functions/clipboard";
import IconButton from "../../ottery-ui/buttons/IconButton";
import ButtonField from "../../ottery-ui/buttons/ButtonField";
import { useSelector } from "react-redux";
import paths from "../../router/paths";
import { SubHeader } from "../../ottery-ui/headers/SubHeader";
import { noId } from "ottery-dto";
import { useNavigator } from "../../hooks/useNavigator";
import { EventGuard } from "../../guards/EventGuard";

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${margin.large};
`;

const HeaderInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${margin.small};
`;

const Title = styled.div`
    font-weight: bold;
    font-size: ${font.large};
`;

const Affiliate = styled(Title)`
    font-weight: normal;
`;

const Summary = styled(Title)`
`;

const Bod = styled.div`
    display:flex;
    flex-direction: column;
    gap: ${margin.large};
    padding: ${margin.medium};
    box-sizing: border-box;
`;

export function EventInfo() {
    const {eventId} = useParams();
    const [event, setEvent] = useState({});
    const [org, setOrg] = useState({});
    const [owner, setOwner] = useState({});
    const userId = useSelector(store=>store.auth.sesh.userId);
    const navigator = useNavigator();
    
    useEffect(()=>{
        (async ()=>{
            const event = (await EventApi.getInfo(eventId)).data;
            setEvent(event);
            setOrg(event.org);

            if (event.org === noId) {
                const owner = (await EventApi.getOwner(eventId)).data;
                setOwner(owner);
            }
        })()
    },[eventId]);

    return(
        <Main>
            <SubHeader>
                <HeaderInfo>
                    <Summary>{event.summary}</Summary>
                    <Affiliate>{org.name || `${owner.firstName} ${owner.lastName}`}</Affiliate>
                </HeaderInfo>
                    <IconButton 
                        icon="share"
                        onClick={()=>copyText(
                            window.location.href,
                            "Link coppied to clipboard",
                            "Looks like we are having trouble with this right now"
                        )}
                    />
            </SubHeader>
            <Bod>
                {event.description}
                <ButtonField>
                    <EventGuard
                        isRegistered={eventId}
                        successHtml={
                            <Button
                                onClick={()=>{
                                    navigator(paths.event.dash, {eventId});
                                }}
                            >
                                Dashboard
                            </Button>
                        }
                        failHtml={
                            <Button
                                onClick={()=>{
                                    navigator(paths.event.signup, {eventId});
                                }}
                            >
                                Sign Up
                            </Button>
                        }
                    />
                </ButtonField>
            </Bod>
        </Main>
    );
}