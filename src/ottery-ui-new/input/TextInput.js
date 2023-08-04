import { TextField } from "@mui/material"
import { INPUT_STYLE } from "./input.style"
import { capitalizeFirstCharacter } from "../functions/capitalizeFirstCharacter"

export function TextInput({
    label,
    variant="outlined",
    value,
    onChange,
}) {
    return <TextField
        label={capitalizeFirstCharacter(label)} 
        variant={variant}
        style={INPUT_STYLE}
        value={value}
        onChange={onChange}
    />
}
