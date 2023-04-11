import {MainSignUp} from "./signUp.styles";
import ShadowBox from "../../../ottery-ui/containers/Shadowbox";
import {checkMarkHappy} from "../../../assets/images/icons";
import Image from  "../../../ottery-ui/images/Image";
import Button from "../../../ottery-ui/buttons/Button";
import useSwapState from "../../../hooks/useSwapState";
import paths from "../../../router/paths";
import { useNavigator } from "../../../hooks/useNavigator";
import { Title } from "../../../ottery-ui/text/Title";
import { Guard } from "../../../guards/Guard";

export function DoneSignUp({onDone}) {
    const navigator = useNavigator();
    const [state] = useSwapState();

    return <MainSignUp>
        <Guard after={onDone}>
            <ShadowBox>
                <Title>
                    You are all signed up!
                </Title>
                <Image 
                    src={checkMarkHappy}
                    width={"100%"}
                />
                <Button
                    onClick={()=>{
                        navigator(paths[state].home);
                    }}
                >
                    Done
                </Button>
            </ShadowBox>
        </Guard>
    </MainSignUp>;
}