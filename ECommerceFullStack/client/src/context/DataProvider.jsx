import React, { useState } from 'react';
import { createContext } from 'react';

export const DataContext = createContext(null);

const DataProvider = ({ childern }) => {

    // const [account, setAccount] = useState('');  1 : 7 min

    return (
        <DataContext.Provider value={{
            account, setAccount
        }}>
            {childern}
        </DataContext.Provider>
    )
}
export default DataProvider;