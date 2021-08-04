import React from 'react';

export interface UserContextState {
    address: string;
    setAddress: Function;
}

export const UserContext = React.createContext<UserContextState>({
    address: '',
    setAddress: () => { }
});