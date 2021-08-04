import React from 'react';
import { UserContext } from './address-context-component';

const ADDRESS_INITIAL_VALUE = '';

export interface AddressProviderProps {
  children: React.ReactNode;
}

export const AddressProvider = ({ children }: AddressProviderProps) => {
  const [address, setAddress] = React.useState<string>(ADDRESS_INITIAL_VALUE);

  return <UserContext.Provider children={children} value={{ address, setAddress }} />

}