import {BottomButton} from "../oui";
import {useState, useEffect} from 'react';

export default function Editable({save=()=>{}, children}) {
    const [edit, setEdit] = useState(false);

    return(
        <div>
            {children}
            {(edit) ? <BottomButton icon={"check"} onClick={()=>{
                save();
                setEdit(false);
            }} /> : <BottomButton icon={"edit"} onClick={()=>{
                setEdit(true);
            }}/>}
        </div>
    );
}