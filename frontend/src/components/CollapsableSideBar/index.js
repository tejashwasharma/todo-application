import React from 'react';
import { Div, Toggler, SliderSideBar } from '..';

const CollapsableSideBar = ({ card, onClose }) => {

    return (
        <SliderSideBar animateDisplay={card} onClick={(e) => {
            const { clientX, clientY } = e;
            const { top, bottom, right, left } = e.target.getBoundingClientRect();
            if (!(clientX <= right && clientX >= left && clientY <= bottom && clientY >= top)){
                onClose && onClose();
            }
        }}>
            <Div>
                <Toggler active cursor="auto">{card?.title}</Toggler>

            </Div>
        </SliderSideBar>
    )
}

export default CollapsableSideBar;
