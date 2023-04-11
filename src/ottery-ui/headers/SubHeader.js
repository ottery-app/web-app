import styled from 'styled-components';
import { border } from '../styles/border.js';
import { colors } from "../styles/colors.js";
import { margin } from '../styles/margin.js';
import { radius as rad } from "../styles/radius";
import { hexBrightness } from '../functions/hexBrightness.js';

/**
 * This is the SubHeader component. It allows for a header with the default sub header options and colors
 * through the use of a key callback.
 * @param {string} id - The id of the header.
 * @param {string} primaryColor - The primary color of the header. This is the color used in the tab buttons.
 * @param {string} secondaryColor - The secondary color of the header. this is the secondary color used in the tab buttons.
 * @param {string} radius - the radius that will be applied to the edges of the header
 * 
 * @returns 
 */
export const SubHeader = styled.div`
    ${({
        padding = margin.medium,
        radius = rad.square,
        backgroundColor = colors.primaryDark,
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
    
        background-color: ${backgroundColor};
        border-radius: ${radius} ${radius} 0 0;
        border-bottom: ${borderThickness} solid ${hexBrightness(backgroundColor, 0.95)};
        `
    }}
`;