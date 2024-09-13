import React from "react";
import {useSelector} from "../services/store.ts";
import {getIsAuthChecked, getUser} from "../services/auth/slice.ts";
import {Navigate, useLocation} from "react-router-dom";

type TProtectedRoute = {
    onlyUnAuth?: boolean;
    component: React.JSX.Element;
}


const ProtectedRoute = ({ onlyUnAuth = false, component}: TProtectedRoute): React.JSX.Element => {
    const user = useSelector(getUser);
    const isAuthChecked = useSelector(getIsAuthChecked);
    const location = useLocation();

    // url == "/profile" onlyUnAuth = false user = null
    // url == "/login" from = "/profile" onlyUnAuth = true user = null
    // url == "/login" from = "/profile" onlyUnAuth = true user != null
    // url == "/profile" onlyUnAuth = false user != null
    // url == "/profile" onlyUnAuth = false user = null

    if (!isAuthChecked) {
        return <p>Загрузка...</p>;
    }

    if (!onlyUnAuth && !user) {
        // для авторизованных, но неавторизованный
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (onlyUnAuth && user) {
        // для неавторизованых, но авторизован
        const { from } = location.state ?? { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    // onlyUnAuth && !user для неавторизованных и неавторизован
    // !onlyUnAuth && user для авторизованных и авторизован

    return component;
}

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({component}: {component: React.JSX.Element}): React.JSX.Element => (
    <ProtectedRoute onlyUnAuth={true} component={component} />
);