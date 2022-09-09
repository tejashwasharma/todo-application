
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Div, FlexBox, Wrapper } from '../components';
import Overview from '../screens/auth/Overview';
import Sidebar from '../components/SideBar';
import WorkInProgress from '../screens/auth/WorkInProgress';

const AuthRoutes = () => {
    return (
        <Routes>
            <Route exact path="/overview" element={<WorkInProgress />} />
            <Route exact path="/stats" element={<WorkInProgress />} />
            <Route exact path="/project" element={<Overview />} />
            <Route exact path="/chat" element={<WorkInProgress />} />
            <Route exact path="/calendar" element={<WorkInProgress />} />
            <Route exact path="/setting" element={<WorkInProgress />} />
            <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
    );
};

const AuthRouteWrapper = () => {
    return (
        <Wrapper>
            <FlexBox flexDirection="row" width="100%">
                <Sidebar />
                <Div width="100%">
                    <AuthRoutes />
                </Div>
            </FlexBox>
        </Wrapper>
    );
}

export default AuthRouteWrapper;
