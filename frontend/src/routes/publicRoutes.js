
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../screens/public/Home';

const PublicRoutes = () => (
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);

export default PublicRoutes;