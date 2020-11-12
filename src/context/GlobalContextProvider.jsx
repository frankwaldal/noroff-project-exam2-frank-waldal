import { createContext, useContext, useState } from 'react';
import { useQuery } from 'react-query';

import { getApiToken } from '../utils/apiUtils';

const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
  const [apiToken, setApiToken] = useState('');

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
        updateApiToken: (token) => updateApiToken(token),
      }}
      >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);
