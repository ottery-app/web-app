import { FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from "react";
import { INPUT_STYLE } from "./input.style";

export function MessageInput({
    onSend,
}) {
    const [message, setMessage] = useState("");

    const handleClickOnSend = async () => {
        const old = message;
        await onSend(old);
        setMessage("");
    };

    return (
        <FormControl style={INPUT_STYLE} variant="outlined">
          <OutlinedInput
            type={'text'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="send message"
                  onClick={handleClickOnSend}
                  edge="end"
                >
                    <SendIcon/>
                </IconButton>
              </InputAdornment>
            }
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
          />
        </FormControl>
    );
}