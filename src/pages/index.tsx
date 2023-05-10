import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useResetScrollAtEveryPage } from "./hooks";
import Login from "./login";

const IndexPage = lazy(() => import("./index/index"));

const Routing = () => {
    useResetScrollAtEveryPage();

    return (
        <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default Routing;