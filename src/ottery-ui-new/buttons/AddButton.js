import { radius } from "../styles/radius";
import { Button } from "./Button";
import { Title } from "../text/Title";
import { clickable } from "../styles/clickable";

export function AddButton({
    onClick
}) {
    return (
        <Button
            color="success"
            onClick={onClick}
            width={clickable.minWidth}
            height={"60px"}
        ><Title h="2" margin={0}>+</Title></Button>
    );
}