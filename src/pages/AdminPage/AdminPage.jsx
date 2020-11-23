/** @jsxImportSource @emotion/core */

import { Container } from '@material-ui/core';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { MAIN_TOP_MARGIN } from '../../constants/emotionCSSrules';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import AdminSection from './AdminSection';
import Login from './Login';
import { validateLoginToken } from '../../utils/apiUtils';

export default function AdminPage() {
  const [loginToken, setLoginToken] = useState('');
  const { isLoggedIn, toggleLoggedIn } = useGlobalContext();

  if (localStorage.getItem('loginToken') && loginToken === '' && !isLoggedIn) {
    setLoginToken(localStorage.getItem('loginToken'));
  }

  useQuery(loginToken, validateLoginToken, {
    enabled: loginToken !== '' && !isLoggedIn,
    onSuccess: data => {
      if (data.statusCode === 401) {
        localStorage.removeItem('loginToken');
        toggleLoggedIn(false);
      } else {
        toggleLoggedIn(true);
      }
    },
    onError: () => {
      localStorage.removeItem('loginToken');
      toggleLoggedIn(false);
    },
    retry: false,
  });

  return (
    <Container css={MAIN_TOP_MARGIN}>
      {isLoggedIn ? (
        <AdminSection />
      ) : (
        <Login />
      )}
    </Container>
  )
}
