import Button from "../ottery-ui/buttons/Button";

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

    return <Button {...props} state={state} onClick={onClick} />
}