import styled from "styled-components";
import { clickable } from "../../styles/clickable";
import { colors } from "../../styles/colors";
import { radius } from "../../styles/radius";
import useColors from "../../styles/useColors";

const lineThickness = "3px";

const Tab = styled.div`
  background: ${(props) => {
    if (props.active) {
      return props.color.dark;
    } else {
      return props.color.main;
    }
  }};

  border-radius: ${radius.default};
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${clickable.minWidth};
  height: ${clickable.minHeight};
  color: ${(props) => props.color.contrastText};
  &:hover {
    ${clickable.onHover}
  }
`;

const Default = Tab;

const Hanging = styled(Tab)`
  border-radius: 0 0 ${radius.default} ${radius.default};
  border: 0px solid ${(props) => props.color.dark};
  border-top: ${lineThickness} solid ${(props) => props.color.dark};
`;

const Upright = styled(Tab)`
  border-radius: ${radius.default} ${radius.default} 0 0;
  border: 1px solid ${(props) => props.color.contrastText};
`;

const Line = styled(Tab)`
  background: inherit;
  border-radius: 0 0 0 0;
  border-bottom: ${lineThickness} solid
    ${(props) => (props.active ? props.color.main : "green")};
`;

export const TabButtonTypes = {
  hanging: "hanging",
  upright: "upright",
  line: "line",
};

export function TabButton({
  color = colors.secondary,
  onClick = () => {},
  active = false,
  type = "default",
  children,
}) {
  const col = useColors({ color: color });

  if (type === TabButtonTypes.hanging) {
    return (
      <Hanging color={col} onClick={onClick} active={active}>
        {children}
      </Hanging>
    );
  } else if (type === TabButtonTypes.upright) {
    return (
      <Upright color={col} onClick={onClick} active={active}>
        {children}
      </Upright>
    );
  } else if (type === TabButtonTypes.line) {
    return (
      <Line color={col} onClick={onClick} active={active}>
        {children}
      </Line>
    );
  } else {
    return (
      <Default color={col} onClick={onClick} active={active}>
        {children}
      </Default>
    );
  }
}
