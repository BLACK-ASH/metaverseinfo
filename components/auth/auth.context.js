"use client";
import { getUser, loginUser, logoutUser } from "@/lib/auth.action";
import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
       const fetchUser = async () => {
           const user = await getUser();
           setUser(user);
       }
       if (typeof window !== "undefined") {
           fetchUser();
       }
    }, []);

    const login = async (values) => {
        const res = await loginUser(values);

        if (res.status === 200) {
            setUser(res.data);
        }
        return res

    }

    const logout = async () => {
        setUser(null);
        await logoutUser();
    };



    return <authContext.Provider value={{ user, logout, login }}>{children}</authContext.Provider>;
};

const useAuth = () => useContext(authContext);


export { useAuth, AuthProvider };