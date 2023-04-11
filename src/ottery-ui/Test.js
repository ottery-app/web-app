import TextInput from "../ottery-ui/input/TextInput";
import { useState } from "react";

export default function Test() {
    const [value, setValue] = useState("");

    return(
        <div>
            <TextInput
                label={"fart"}
                value = {value}
                onChange={(e)=>{setValue(e.target.value)}}
            />
            <button onClick={()=>{
                console.log(value);
            }}>sub</button>
        </div>
    );
}