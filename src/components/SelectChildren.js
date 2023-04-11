import { useState } from "react";
import Faded from "../ottery-ui/text/Faded";
import { Main } from "./Main";
import OrderedList from "../ottery-ui/lists/OrderedList";
import SelectionButton from "../ottery-ui/buttons/SelectionButton";
import ImageButton from "../ottery-ui/buttons/ImageButton";
import { Ping } from "../ottery-ping/Ping";

export function SelectChildren({
    doneTitle = "Done",
    htmlForNone = <Faded>no children</Faded>,
    children=[],
    setChildren=()=>{},
    onDone=()=>{},
    onAdd,
}) {
    const [count, setCount] = useState(0);

    function updateChild(kiddo) {
        return ()=>{
            if (kiddo.state === "success") {
                setChildren(children.map((child)=>{
                    if (child._id === kiddo._id) {
                        child.state = "defualt";
                        return child;
                    }
                }));
                setCount(p=>p-1);
            } else {
                setChildren(children.map((child)=>{
                    if (child._id === kiddo._id) {
                        child.state = "success";
                    }

                    return child;
                }));
                setCount(p=>p+1);
            }
        }
    }

    return <Main>
        <SelectionButton
            itemCount={count}
            itemTitle={["child", "children"]}
            buttonTitle={doneTitle}
            onClick={()=>{
                const chillins = children
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
        {children.length 
            ? <OrderedList
                onClick={onAdd}
            >
                {children.map((kiddo)=>{
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
    </Main>
}