import React from "react";
import styled from "styled-components";
import { image, styles } from "../styles/image";
import { colors } from "../styles/colors";
import { radius as rad } from "../styles/radius";
import { margin } from "../styles/margin";
import TabField from "../buttons/tabs/TabField";
import { TabButtonTypes } from "../buttons/tabs/TabButton";
import { IconButton } from "react-native-paper";
import Image from "../image/Image";


const IMAGE_RAD = styles.clickable.minHeight;

const Header = styled.div`
  display: flex;
  flex-direction: column;

  gap: ${margin.medium};
  width: 100%;
  background-color: ${colors.background.primary};
  border-radius: ${(props) => props.radius} ${(props) => props.radius} 0 0;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

const UserDetails = styled.div`
  display: flex;
  width: 100%;
  align-items: start;
  justify-content: center;
  flex-direction: row;
  gap: ${margin.large};
  margin: ${margin.medium};
`;

const Title = styled.div`
  display: flex;
`;
const Settings = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: ${margin.medium};
`;

const MarginRight = styled.div`
  margin-right: ${margin.large};
`;

export function MultiFieldHeader({
  //top row
  title = "title", //can be an array

  //image
  src = "pfp",
  alt = "profile photo",

  //tabs
  tabs = [],
  tab = tabs[0],
  onTab = () => {},
  onSettings = null,

  //style
  radius = rad.square,
}) {
  console.log(tabs);
  const head = Array.isArray(title) ? title : [title];
  const name = head[0].split(" ");
  return (
    <>
      <Header radius={radius}>
        <Top>
          <UserDetails>
            <Image
              src={src}
              alt={alt}
              width={IMAGE_RAD}
              height={IMAGE_RAD}
              radius={rad.round}
            />
            <Title>
              {name[0].charAt(0).toUpperCase() + name[0].slice(1)}
              <br />
              {name.splice(1)}
            </Title>
          </UserDetails>

          {onSettings && (
            <Settings>
              <MarginRight>
                {<IconButton icon="cog" size={24} onPress={onSettings} />}
              </MarginRight>
            </Settings>
          )}
        </Top>
        <TabField
          type={TabButtonTypes.upright}
          tabs={tabs}
          active={tab}
          onPress={() => onTab(tabItem)}
        />
      </Header>
    </>
  );
}