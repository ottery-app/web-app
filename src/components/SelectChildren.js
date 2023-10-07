import { useMemo } from "react";
import Faded from "../ottery-ui/text/Faded";
import { Main } from "./Main";
import OrderedList from "../ottery-ui/lists/OrderedList";
import SelectionButton from "../ottery-ui/buttons/SelectionButton";
import ImageButton from "../ottery-ui/buttons/ImageButton";
import { usePing } from "../ottery-ping";
import styled from "styled-components";
import { margin } from "../ottery-ui/styles/margin";
import { BUTTON_STATES } from "../ottery-ui/buttons/button.enum";
import { useInternalState } from "../hooks/useInternalState";

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${margin.medium};
`;

export function SelectChildren({
    doneTitle = "Done",
    htmlForNone = <Faded>no children</Faded>,
    children=[],
    onDone=()=>{},
    onAdd,
}) {
    const [internalChildren, setChildren] = useInternalState(children);
    const Ping = usePing();
    //we could log this but this adds the possibility of a bug and since the number of
    //items in the array will usually be smaller then 5 it doesnt need to be fast.
    const count = useMemo(()=>{
        return internalChildren.reduce((count, child)=>{
            if (child.state === BUTTON_STATES.success) {
                return count + 1;
            } else {
                return count;
            }
        }, 0);
    }, [internalChildren]);

    function updateChild(kiddo) {
        return ()=>{
            if (kiddo.state === BUTTON_STATES.success) {
                setChildren(internalChildren.map((child)=>{
                    if (child._id === kiddo._id) {
                        child.state = BUTTON_STATES.default;
                    }

                    return child;
                }));
            } else {
                setChildren(internalChildren.map((child)=>{
                    if (child._id === kiddo._id) {
                        child.state = BUTTON_STATES.success;
                    }

                    return child;
                }));
            }
        }
    }

    return <Main>
        <Flex>
            <SelectionButton
                itemCount={count}
                itemTitle={["child", "children"]}
                buttonTitle={doneTitle}
                onClick={()=>{
                    const chillins = internalChildren
                        .filter((c)=>c.state==="success")
                        //its good to wipe : )
                        .map((c)=>delete c.state && c);
                    
                    if (!chillins.length) {
                        Ping.error("Must select at least one child");
                    } else {
                        onDone(chillins);
                    }
                }}
            />
            {internalChildren.length 
                ? <OrderedList
                    onClick={onAdd}
                >
                    {internalChildren.map((kiddo)=>{
                        return <ImageButton
                            state={kiddo.state}
                            key={kiddo._id}
                            content={kiddo.firstName}
                            right={"pfp" && kiddo.pfp.src}
                            onClick={updateChild(kiddo)}
                        />
                    })}
                </OrderedList>
                :htmlForNone
            }
        </Flex>
    </Main>
}