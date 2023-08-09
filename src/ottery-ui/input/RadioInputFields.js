import styled from "styled-components";
import Input, { INPUT } from "./Input";
import {useState, createElement} from "react";
import {margin} from "../../ottery-ui/styles/margin";
import { colors } from "../styles/colors";
import { useEffect } from "react";

const Main = styled.div`
    width: 100%;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap:${margin.large};
    padding-left: ${margin.large};
`;

const Label = styled.div`
    margin-bottom: ${margin.large};
`;

const RowBox = styled.div`
    border-bottom: 2px solid ${props=>(props.current)?colors.primary.dark : colors.background.primary};

    &:hover {
        border-bottom: 2px solid ${props=>(props.current)?colors.primary.dark:colors.background.primary};
    }
`;

const FormRow = styled.div`
    padding: ${margin.small};
    display:grid;
    grid-template-columns: 50px auto;
    jusify-content: center;
    align-items: center;
    gap: ${margin.small};
    opacity: ${props=>(props.current)?1:0.3};
    pointer-events: ${props=>(props.current)?"auto":"none"};
`;

function InputPurgatory({
    type,
    value,
    onChange,
    props,
    current,
}) {
    const [valuePurg, setValuePurg] = useState((current) ? value : undefined);
    const [e, setE] = useState({
        target: {},
    });

    function handleChange(e) {
        setValuePurg(e.target.value);
        setE(e);
        return onChange(e);
    }

    useEffect(()=>{
        if (current) {
            handleChange(e)
        }
    }, [current]);


    if (INPUT[type]) {
        return <Input 
            {...props}
            type={type}
            value={valuePurg}
            onChange={handleChange}
        />
    }
}

// options={[
//         {
//             label: "Never",
//             key: "never",
//         },
//         {
//             label: "On",
//             key: "on",
//             type: "date",
//         },
//         {
//             label: "After",
//             key: "after",
//             type: "number",
//             props: {
//                 min: 1,
//             }
//         }
// ]}
export default function RadioInputFields({
    label,
    value,
    current,
    onChange,
    options=[]
}) {
    const [curr, setCurrent] = useState(options[0].key);

    useEffect(()=>{
        setCurrent(current);
    },[current]);

    return (
        <Main>
            <Label>{label}</Label>
            <Form>
                {options.map((option, i)=>{
                    function onChangeFormat(e) {
                        e.for = option.key || option.label;
                        return onChange(e);
                    }

                    return (
                        <RowBox 
                            key={i}
                            current={curr === i}
                            onClick={()=>{setCurrent(option.key)}}
                        >
                            <FormRow current={curr === option.key}>
                                {option.label}
                                <InputPurgatory
                                    onChange={onChangeFormat}
                                    type={option.type}
                                    current={curr===option.key}
                                    value={value}
                                    props={option.props}
                                />
                            </FormRow>
                        </RowBox>
                    );
                })}
            </Form>
        </Main>
    );
}