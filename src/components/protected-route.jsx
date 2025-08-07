import {useSelector} from "react-redux";
import {getIsAuthChecked, getUser} from "../services/user";
import {Navigate, useLocation} from "react-router-dom";

const Protected = ({onlyUnAuth = false, component}) => {
    const isAuthChecked = useSelector(getIsAuthChecked);
    const user = useSelector(getUser);
    const location = useLocation();

    // url = /profile, onlyUnAuth === false, user === null
    // url = /login, from = /profile, onlyUnAuth === true, user === null
    // url = /login, from = /profile, onlyUnAuth === true, user !== null
    // url = /profile onlyUnAuth === false, user !== null
    // url = /profile onlyUnAuth === false, user === null

    if (!isAuthChecked) {
        return <p>Loading...</p>;
    }

    if (!onlyUnAuth && !user) {
        // для авторизованного, но неавторизован
        return <Navigate to="/login" state={{from: location}} />;
    }

    if (onlyUnAuth && user) {
        // для неавторизованного, но авторизован
        const { from } = location.state ?? { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    // !onlyUnAuth && user для авторизованного и авторизован
    // onlyUnAuth && !user для неавторизованного и неавторизован

    return component;
}

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
    <Protected onlyUnAuth={true} component={component} />
);