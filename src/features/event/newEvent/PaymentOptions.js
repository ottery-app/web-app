import { useState } from "react";
import NumberInput from "../../../ottery-ui/input/NumberInput";
import { Main, Form, Head } from "./newEventStyles";
import { useEffect } from "react";

export default function PaymentOptions({
    form,
    setForm,
    updateErrorHandler,
}) {
    const [cost, setCost] = useState(form.cost);

    useEffect(()=>{
        updateErrorHandler(()=>{});

        setForm((form)=>{
            return {
                ...form,
                cost: (cost) ? +cost : 0,
            }
        });
    }, [cost]);

    return (
        <Main>
            <Form>
                <Head>Payment</Head>
                <NumberInput  
                    label="cost of registration USD" 
                    value={cost} 
                    onChange={(e)=>{setCost(e.target.value)}}
                />
            </Form>
        </Main>
    );
}