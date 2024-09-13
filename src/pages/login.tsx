import {useDispatch} from "../services/store.ts";
import {login} from "../services/auth/actions.ts";

export const Login = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(login());
    }

    return (
        <div className="page">
            <h1 className="title">Логин</h1>
            <button className="button" onClick={onClick}>Войти</button>
        </div>
    )
}