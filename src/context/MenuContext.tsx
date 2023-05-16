import React, { createContext, useState } from 'react';


type IMenu = {
    menuOpen?: any;
    setMenuOpen?: any;
}


export const MenuContext = createContext({} as IMenu);

export function MenuProvider({ children }) {

    const [menuOpen, setMenuOpen] = useState();

    return (
        <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>
            {children}
        </MenuContext.Provider>
    )
}

