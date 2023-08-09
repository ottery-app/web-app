import styled from "styled-components";
import AddButton from "../buttons/actionButtons/AddButton";
import DelButton from "../buttons/actionButtons/DelButton";
import { clickable } from "../styles/clickable";
import { colors } from "../styles/colors";
import { margin } from "../styles/margin";
import { radius } from "../styles/radius";

const Main = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${margin.large};
`;

const ItemField = styled.div`
    display: grid;
    grid-template-columns: 1fr 44px;
    grid-gap: ${margin.large};
    justify-items: stretch;
    width: 100%;
`;

const Text = styled.div`
    display: flex;
    height: ${clickable.minHeight};
    align-items:center;
    justify-content:start;
`;

const rad = radius.default;

function Item({
    onDelete=()=>{},
    children,
}) {
    return(
        <ItemField>
            <div>{children}</div>
            <DelButton
                onClick={()=>{onDelete(children)}}
                color={colors.error}
                radius={rad}
            />
        </ItemField>
    );
}

export default function AppendList({
    onAdd,
    onDelete,
    children,
}) {
    return(
        <Main>
            {children.map((child, i)=>
                <Item key={i} onDelete={onDelete}>{child}</Item>
            )}
            <ItemField>
                <Text>Add New Field</Text>
                <AddButton
                    onClick={onAdd}
                    color={colors.primary}
                    radius={rad}
                />
            </ItemField>
        </Main>
    );
}