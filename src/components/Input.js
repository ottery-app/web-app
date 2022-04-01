import "../css/Input.css";
import "../css/colors.css";

import { useState } from "react";

function TextInput({className, name, value, setValue, secure}) {
    let title = null;
    let type = "text";
    let input = <input className="text-area b0" onChange={(e)=>{setValue(e.target.value)}} type={type} value={value} placeholder={name} />;

    if (secure) {
      type = "password";  
    }

    if (value) {
        title = <label className="t3 title">{name}</label>;
        input = <input className="text-area b0 shift" onChange={(e)=>{setValue(e.target.value)}} type={type} value={value} placeholder={name} />;
    }

    return (
        <div className={"text-input " + className}>
            {title}
            {input}
        </div>
    );
}

function OptionInput({className, name, value, setValue, options}) {
    let title = null;
    let type = "text";
    let input = <input className="text-area b0" onChange={(e)=>{setValue(e.target.value)}} type={type} value={value} placeholder={name} list={name+"s"}/>;

    if (value) {
        title = <label className="t3 title">{name}</label>;
        input = <input className="text-area b0 shift" onChange={(e)=>{setValue(e.target.value)}} type={type} value={value} placeholder={name} list={name+"s"}/>;
    }

    return (
        <div className={"text-input " + className}>
            {title}
            {input}
            <datalist id={name+"s"}>
                {options.map((state, index) => {return <option key={index} value={state} />})}
            </datalist>
        </div>
    );
}

function DateInput({className, name, value, setValue}) {

    const calander = <>
                        <label className="t3 title">{name}</label>
                        <input className="text-area b0 shift" onChange={(e)=>{setValue(e.target.value)}} type="date"  placeholder={name}/>
                    </>

    const [display, setDisplay] = useState(<input className="text-area b0" onClick={()=>{setDisplay(calander)}} onChange={(e)=>{setValue(e.target.value)}} type="text" placeholder={name} />);

    return (
        <div className={"text-input " + className}>
            {display}
        </div>
    );
}

export {
    TextInput, 
    OptionInput,
    DateInput
}