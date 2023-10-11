import React from "react";
import styled from "styled-components";
import TabButtons from "../buttons/TabButtons";
import Image from "../images/Image";
import { image } from "../styles/image";
import { colors } from "../styles/colors";
import { radius as rad } from "../styles/radius";
import { margin } from "../styles/margin";
import multPx from "../functions/multPx";
import TabField from "../buttons/tabs/TabField";
import { TabButtonTypes } from "../buttons/tabs/TabButton";

const IMAGE_RAD = image.mediumProfile;

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
  justify-content: end;
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

  settings = null,

  //style
  radius = rad.square,
}) {
  const head = Array.isArray(title) ? title : [title];
  const name = head[0].split(" ");

  //color=useColors({color});

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

          {settings && (
            <Settings>
              <MarginRight>
                <Image
                  src="gear"
                  alt={alt}
                  width={image.extraSmallProfile}
                  height={image.extraSmallProfile}
                  radius={rad.round}
                />
              </MarginRight>
            </Settings>
          )}
        </Top>
        <TabField
          type={TabButtonTypes.upright}
          tabs={tabs}
          active={tab}
          onTab={onTab}
        />
      </Header>
    </>
  );
}
