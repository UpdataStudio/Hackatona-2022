import { getCookie } from 'cookies-next';
import { useState } from 'react';
import { createContext, useContext } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {

    let logged = getCookie('authentication');
    logged = logged ? JSON.parse(logged) : null;

    const [user, setUser] = useState(logged);

    let sharedState = {
        user,
        setUser
    };
    return (
        <AppContext.Provider value={sharedState} >
            {children}
        </AppContext.Provider>
    );
}
export function useAppContext() {
    return useContext(AppContext);
}
