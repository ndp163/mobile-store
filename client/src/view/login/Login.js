import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import Header from "../../component/header/Header";
import { AuthContext } from "../../context/AuthContext";
import "./Login.scss";

function Login() {
    const { loginUser, authState } = useContext(AuthContext);

    const [loginFrom, setLoginForm] = useState({
        username: "",
        password: "",
    });
    const [alert, setAlert] = useState(null);

    const onChangeLogin = (event) => {
        setLoginForm({
            ...loginFrom,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const res = await loginUser(loginFrom);
        if (!res.success) {
            setAlert(res.message);
            setTimeout(() => {
                setAlert(null);
            }, 3000);
        }
    };

    return authState ? (
        <Redirect to="/add" />
    ) : (
        <>
            <Header title="Mobile store" />
            <div class="login-form">
                <div class="title">Please sign in</div>
                {alert ? <div className="alert-box">{alert}</div> : null}
                <form method="post" onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="User Name"
                        onChange={onChangeLogin}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={onChangeLogin}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
}

export default Login;
