import styled from "styled-components";
import { margin } from "../../../ottery-ui/styles/margin";

const Border = styled.div`
    width: 100%;
`;

const Form = styled.div`
    margin: ${margin.medium};
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items:center;
    gap: ${margin.medium};
`;

export function MainSignUp({children}) {
    return( 
        <Border>
            <Form>
                {children}
            </Form>
        </Border>
    )
}