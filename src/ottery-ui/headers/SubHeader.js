import styled from 'styled-components';
import { border } from '../styles/border.js';
import { colors } from "../styles/colors.js";
import { margin } from '../styles/margin.js';
import { radius as rad } from "../styles/radius";
import { hexBrightness } from '../functions/hexBrightness.js';

export const SubHeader = styled.div`
    ${({
        padding = margin.medium,
        radius = rad.square,
        borderThickness = border.default
    })=>{
        return `
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 20px;
        align-items: center;
        width: 100%;
        padding: ${padding};
        box-sizing: border-box;
    
        background-color: ${colors.background.secondary};
        border-radius: ${radius} ${radius} 0 0;
        border-bottom: ${borderThickness} solid ${hexBrightness(colors.background.secondary, 0.95)};
        `
    }}
`;