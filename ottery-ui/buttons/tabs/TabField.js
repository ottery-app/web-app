import useColors from "../../styles/useColors";
import { colors } from "../../styles/colors";
import { TabButton } from "./TabButton";
import { useState } from "react";
import styled from "styled-components";

function generateAutos(length) {
  let auto = "";
  for (let i = 0; i < length; i++) {
    auto = auto.concat(" auto");
  }
  return auto;
}

const Main = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) => generateAutos(props.children.length)};
  grid-template-rows: auto;
`;

export default function TabField({
  color = colors.secondary,
  type = "default",
  tabs = [],
  active = tabs[0],
  onTab = () => {},
}) {
  const [current, setCurrent] = useState(active);
  color = useColors({ color });

  return (
    <Main color={color}>
      {tabs.map((tab) => (
        <TabButton
          color={color}
          key={tab}
          onClick={() => {
            setCurrent(tab);
            onTab(tab);
          }}
          active={tab === current}
          type={type}
        >
          {tab}
        </TabButton>
      ))}
    </Main>
  );
}
