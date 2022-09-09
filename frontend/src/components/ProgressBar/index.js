import React from 'react';
import { Progress, ProgressWrapper } from '..';

const ProgressBar = ({ percentage }) => (
    <ProgressWrapper>
        <Progress percentage={percentage}>&nbsp;</Progress>
    </ProgressWrapper>
);

export default ProgressBar;
