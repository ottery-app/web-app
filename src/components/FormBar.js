import "../css/FormBar.css"

function FormBar({numFields, current}) {
    let options = [];

    for (let i = 0; i < numFields; i++) {
        options.push(i+1);
    }


    return(
        <div id="form-bar">
            <div>
                {options.map((val) => {
                    let cur = false;
                    if (val === current) {
                        cur = "current";
                    }
                    
                    return <Field val={val} status={cur}/>
                })}
            </div>
        </div>
    );
}

function Field({val, status}) {
    let numFields = "b6 c3 t3";
    let barFields = "b0 c4";

    if (status === "current") {
        numFields = "b4 c3 t4";
        barFields = "b0 c2";
    }

    return(
        <span>
            <div className={numFields}>{val}</div>
            <hr className={barFields}/>
        </span>
    );
}

export default FormBar