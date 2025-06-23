import { Outlet } from "react-router-dom"; 
import NavBar from "./NavBar";
import { createContext, useReducer } from "react";
import { User, userReducer } from "../types/user";

export type UserContextType = {
    user: User;
    userDispatch: React.Dispatch<any>;
};

export const UserContext = createContext<UserContextType | null>(null);

const AppLayot = () => {
    const initialUser: User = {
        id: null,
        name: '',
        email: '',
        password: '',
        address: '',
        phone: ''
    };

    const [user, userDispatch] = useReducer(userReducer, initialUser)
 
    return (
        <UserContext.Provider value={{ user, userDispatch }}>
            {/* <NavBar /> */}
            <Outlet /> 
        </UserContext.Provider>
    );
}

export default AppLayot;
