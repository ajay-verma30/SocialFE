import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token); // Decode token to extract user info
                return { token, decoded }; // Store both token and decoded data
            } catch (error) {
                console.error("Invalid token", error);
                return null;
            }
        }
        return null;
    });
    const login = (userData) => {
        setUser({ token: userData.token, decoded: jwtDecode(userData.token) }); // Decode on login
        localStorage.setItem("token", userData.token);
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem("token", user.token);
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
