import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL, STORAGE_NAME } from "../constant";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState(false);

    const authUser = async () => {
        const token = localStorage.getItem(STORAGE_NAME);

        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else delete axios.defaults.headers.common["Authorization"];
        try {
            const response = await axios.get(`${API_URL}/api/auth`);
            if (response.data.success) setAuthState(true);
        } catch (error) {
            localStorage.removeItem(STORAGE_NAME);
            setAuthState(false);
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    const loginUser = async (loginForm) => {
        try {
            const res = await axios.post(
                `${API_URL}/api/auth/login`,
                loginForm
            );
            console.log(res.data);
            if (res.data.success)
                localStorage.setItem(STORAGE_NAME, res.data.token);
            authUser();
            return res.data;
        } catch (error) {
            if (error.response) return error.response.data;
            return {
                success: false,
                message: error.message,
            };
        }
    };

    const logoutUser = async () => {
        localStorage.removeItem(STORAGE_NAME);
        setAuthState(false);
    };
    useEffect(() => authUser(), []);

    const AuthContextData = {
        loginUser,
        logoutUser,
        authState,
        authUser,
    };
    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
