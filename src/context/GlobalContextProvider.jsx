import { createContext, useContext, useState } from 'react';
import { useQuery } from 'react-query';

import { getApiToken } from '../utils/apiUtils';

const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  const [apiToken, setApiToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openTab, setOpenTab] = useState('enquiries');

  useQuery('getApiToken', getApiToken, {
    enabled: apiToken === '',
    onSettled: data => {
      setApiToken(data.jwt);
    }
  });

  function updateApiToken(token) {
    setApiToken(token);
  }

  return (
    <GlobalContext.Provider
      value={{
        apiToken,
        isLoggedIn,
        openTab,
        toggleLoggedIn: (value) => setIsLoggedIn(value),
        updateApiToken: (token) => updateApiToken(token),
        updateOpenTab: (tab) => setOpenTab(tab),
      }}
      >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);
