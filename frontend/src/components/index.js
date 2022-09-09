import styled, { keyframes } from 'styled-components';
import colors from '../utils/colors';

export const Div = styled.div`
    ${({ display }) => display && `display: ${display};`}
    ${({ position }) => position && `position: ${position};`}
    ${({ padding }) => padding && `padding: ${padding};`}
    ${({ margin }) => margin && `margin: ${margin};`}
    ${({ border }) => border && `border: ${border};`}
    ${({ borderWidth }) => borderWidth && `border-width: ${borderWidth};`}
    ${({ background }) => background && `background: ${background};`}
    ${({ color }) => color && `color: ${color};`}
    ${({ flexFlow }) => flexFlow && `flex-flow: ${flexFlow};`}
    ${({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection};`}
    ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
    ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
    ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius};`}
    ${({ width }) => width && `width: ${width};`}
    ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}
    ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
    ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}
    ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
    ${({ height }) => height && `height: ${height};`}
    ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
    ${({ cursor }) => cursor && `cursor: ${cursor};`}
    ${({ boxShadow }) => boxShadow && `box-shadow: 0px 0px 5px 0px ${boxShadow};`}
`;

export const FlexBox = styled(Div)`
    display: flex;
`;

export const SliderSideBar = styled(FlexBox)`
    flex-direction: column;
    position: fixed;
    top: 0;
    height: 100%;
    background: ${colors.white};
    padding: 20px;
    width: ${Math.floor(window.innerWidth * 0.4)}px;
    ${({ animateDisplay }) => animateDisplay ? `
        right: 0;
        animation: ${() => keyframes`
            0% { right: -${String(Math.floor(window.innerWidth * 0.4))}px; }
            100% { right: 0px; }
        `};
        animation-duration: 5s;
        animation-fill-mode: forwards;
        box-shadow: 3px 0 20px 0 ${colors.boxShadow};
        ::before {
            content: ' ';
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: calc(100% - ${String(Math.floor(window.innerWidth * 0.4) + 40)}px);
            height: 100%;
            background: #0000005c;
        }
    ` : `
        right: -${String(Math.floor(window.innerWidth * 0.4) + 40)}px;
    `}
`;

// Screen Wrappers
export const Wrapper = styled(FlexBox)`
    height: 100%;
    width: 100%;
    z-index: -1;
    overflow-x: hidden;
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey;
        border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
    }
    
    * {
        color: ${colors.active};
    };
`;

export const ContainerWrapper = styled(Wrapper)`
    width: calc(100% - 70px);
    height: calc(100% - 60px);
    padding: 30px;
    display: block;
`;

export const Container = styled(Div)`
    border: 1px solid ${colors.darkBorder};
    border-radius: 65px;
    padding: 60px;
`;

export const ListContainer = styled(Div)`
    background: ${colors.lightGreenBg};
    border-radius: 15px;
    padding: 20px;
    margin: 20px;
    width: 100%;
`;

export const Button = styled.button`
    height: 45px;
    width: 314px;
    border-radius: 8px;
    margin: 5px 2px;
    border: 0;
    cursor: pointer;
    ${({ background }) => background && `background: ${background};`}
    ${({ color }) => color && `
        color: ${color};
        svg path {
            fill: ${color};
        }
    `}
    ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
    ${({ width }) => width && `width: ${width};`}
    ${({ sm }) => sm && `width: unset; padding: 0 10px;`}
`;

export const PrimaryButton = styled(Button)`
    background: ${colors.primaryButton};
    color: ${colors.white};
`;

export const InputAfter = styled(Div)`
    position: relative;
    cursor: pointer;
    > svg {
        position: absolute;
        top: 15px;
        left: -30px;
    }
`;

export const Toggler = styled(Div)`
    font-size: 26px;
    margin: 0 10px;
    position: relative;
    cursor: pointer;
    ${({ active }) => active ? `
        ::after {
            content: '';
            display: block;
            position: absolute;
            botton: 0;
            left: 0;
            width: 25%;
            border-bottom: 3px solid ${colors.active};
        }
    ` : `
        color: ${colors.inactive};
    `}
`;

// Anchor
export const NavLink = styled(Div)`
    display: flex;
    flex-direction: row;
    min-width: 100px;
    padding: 10px 40px;
    text-decoration: none;
    position: relative;
    cursor: pointer;
    > svg {
        margin: auto 10px;
        path:not(.no-fill) {
            fill: ${({ isactive }) => isactive ? colors.active : colors.inactive};
        }
        path.stroke-only {
            stroke: ${({ isactive }) => isactive ? colors.active : colors.inactive};
        }
    }
    > span {
        color: ${({ isactive }) => isactive ? colors.active : colors.inactive};
    }
    ${({ isactive }) => isactive && `
        ::after {
            content: '';
            display: block;
            position: absolute;
            bottom: 10px;
            right: -0;
            width: 100%;
            height: calc(100% - 20px);
            border-right: 6px solid #329C89;
        }
    `}
`;

export const DropDown = styled(FlexBox)`
    cursor: pointer;
    > div {
        display: none;
        flex-direction: row;
        align-items: center;
    }
    > div:first-child {
        display: flex;
    }
    svg {
        margin: auto 10px;
        path:not(.no-fill) {
            fill: ${colors.active};
        }
        path.stroke-only {
            stroke: ${colors.active};
        }
    }
`;

// Card
export const Card = styled(Div)`
    border-radius: 10px;
    border: 1px solid ${colors.lightBorder};
    padding: 20px;
    background: ${colors.white};
    margin: 25px 0;
    cursor: grabbing;
`;

export const SecondaryCard = styled(Div)`
    border-radius: 25px;
    padding: 15px 20px;
    margin: 15px 20px;
    box-shadow: 0px 2px 5px 0px ${colors.black};
    cursor: pointer;
`;

export const CardHeader = styled(FlexBox)`
    border: 0;
    flex-direction: column;
    justify-content: space-between;
    font-weight: bold;
`;

export const CardBody = styled(Div)`
    margin: 10px 0;
`;

export const CardFooter = styled(Div)`
    text-align: end;
`;

export const ProgressWrapper = styled(Div)`
    width: 100%;
    border-radius: 10px;
    background: ${colors.darkerTheme};
`;

export const Progress = styled(Div)`
    ${({ percentage }) => percentage && `
        width: ${percentage}%;
        animation-duration: ${Math.ceil(percentage * 3 / 100)}s;
        animation: ${({ percentage }) => keyframes`
            0% { width: 0px; }
            100% { width: ${percentage}%; }
        `};
    `}
    border-radius: 10px;
    background: ${colors.contrastGrad};
    animation-fill-mode: forwards;
`;

export const HorizontalRule = styled(Div)`
    height: 0px;
    width: 100%;
    padding: 40px 0;
    ::after {
        content: '';
        display: block;
        position: relative;
        bottom: 0;
        left: 10%;
        width: 80%;
        border-bottom: 1px solid ${colors.lightBorder};
    }
`;

export const Heading = styled(Div)`
    color: ${colors.active};
`;

export const H1 = styled(Heading)`
    font-size: 2em;
    font-weight: bold;
`;

export const H2 = styled(Heading)`
    font-size: 1.5em;
    font-weight: bold;
`;

export const H3 = styled(Heading)`
    font-size: 1.17em;
    font-weight: bold;
`;

export const Hightlight = styled(Heading)`
    background: ${colors.darkGreenBg};
    color: ${colors.primaryButton};
    font-size: 1.17em;
    font-weight: bold;
    border-radius: 7px;
    padding: 5px;
`;

export const Para = styled(Div)`
    color: ${colors.inactive};
`;

