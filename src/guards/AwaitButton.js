import {Button} from "../ottery-ui-new/buttons/Button";

/**
 * this is a button with an extra status field for modifying state
 * it waits on the value passed in to be not loading or idol
 * @param {ButtonProps} props this now includes status 
 * @returns 
 */
export function AwaitButton(props) {
    let onClick = props.onClick;
    let state ;
    switch (props.status) {
        //case "idle":
        case "paused":
        case "loading":
            onClick = ()=>{}
            state = "disabled";
            break;
        case "success":
            state="success";
            break;
        case "error":
            state = "error";
            break;
        default:
            state = "default";
    }

    const disabled = (state === "disabled") ? true : false;

    return <Button {...props} color={state} disabled={disabled} onClick={onClick} />
}