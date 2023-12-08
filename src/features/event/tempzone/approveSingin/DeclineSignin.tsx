import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import RadioGroup, { OptionProp } from "../../../../../ottery-ui/controls/RadioGroup";
import TextInput from "../../../../../ottery-ui/input/TextInput";
import { margin } from "../../../../../ottery-ui/styles/margin";
import Button from "../../../../../ottery-ui/buttons/Button";
import { BUTTON_STATES } from "../../../../../ottery-ui/buttons/button.enum";
import { usePing } from "../../../../../ottery-ping";
import { Main } from "../../../../../ottery-ui/containers/Main";
import { ButtonSpan } from "../../../../../ottery-ui/containers/ButtonSpan";
import { useChatClient } from "../../../chat/useChatClient";
import { useAuthClient } from "../../../auth/useAuthClient";
import { useNavigator } from "../../../../router/useNavigator";
import paths from "../../../../router/paths";
import { useTempzoneClient } from "../tempzoneClient";
import { requestType } from "@ottery/ottery-dto";

const DEFAULT_TOPICS: OptionProp[] = [
  { label: "No message", value: "No message" },
  { label: "We couldn't find you", value: "We couldn't find you" },
  { label: "Not the same guardian in the photo", value: "Not the same guardian in the photo" },
  { label: "Talk to supervisor", value: "Talk to supervisor" },
];

export function DeclineSignin({ route }) {
    const guardianId = route.params.guardianId;
    const eventId = route.params.eventId;
    const childId = route.params.childId;
    const userId = useAuthClient().useUserId();
    const {useGetDirectChat, useSendMessage} = useChatClient();
    const directChatRes = useGetDirectChat({inputs:[userId, guardianId]});
    const tempzoneClient = useTempzoneClient();
    const decline = tempzoneClient.useDeclineChildRequest();
    const reqeustsRes = tempzoneClient.useGetWaitingChildrenForEvent({
        inputs:[eventId, requestType.DROPOFF],
    });
    const sendMessage = useSendMessage();
    const navigator = useNavigator();
    const Ping = usePing();

    const [option, setOption] = useState(DEFAULT_TOPICS[0].value);
    const [customText, setCustomText] = useState("");
    const message = option || customText;
    const buttonState = !message ? BUTTON_STATES.disabled : BUTTON_STATES.default;

    function handleOptionChange(option: string) {
        setOption(option);
        setCustomText("");
    }

    function handleCustomTextChange(text: string) {
        setCustomText(text);
        setOption("");
    }

    const handleSubmit = () => {
        const chatId = directChatRes.data.data._id;
        const request = reqeustsRes.data.data.find(r=>r.child === childId)

        if (message !== DEFAULT_TOPICS[0].value) {
            sendMessage.mutate([chatId, message], {
                onError: (err: Error) => {
                  Ping.error("Failed to send message");
                },
            });
        }

        decline.mutate(request, {
            onSuccess: ()=>{
                navigator(paths.dropoff.caretaker.root);
            },
            onError: (err: Error) => {
                Ping.error(err.message);
            },
        });
    };

    return (
        <Main style={styles.main}>
        <RadioGroup
            onChange={handleOptionChange}
            options={DEFAULT_TOPICS}
            value={option}
        />
        <TextInput
            onChange={handleCustomTextChange}
            placeholder="Custom"
            value={customText}
        />
        <ButtonSpan>
            <Button onPress={handleSubmit} state={buttonState} width={150}>
                Done
            </Button>
        </ButtonSpan>
        </Main>
    );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    gap: margin.large,
  },
});