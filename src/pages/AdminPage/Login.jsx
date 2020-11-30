/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, LinearProgress, TextField, Typography } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { useGlobalContext } from '../../context/GlobalContextProvider';
import { login } from '../../utils/apiUtils';

const validationSchema = yup.object().shape({
  identifier: yup.string().required('Please provide an username'),
  password: yup.string().required('Please provide a password'),
});

export default function Login() {
  const [loginErrorText, setLoginErrorText] = useState('');
  const { errors, handleSubmit, register } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { toggleLoggedIn } = useGlobalContext();

  const [loginMutation, loginMutationStatus] = useMutation(login, {
    onSuccess: data => {
      if (data.statusCode === 400) {
        setLoginErrorText('Your login failed, please try again.');
      } else {
        localStorage.setItem('loginToken', data.jwt);
        toggleLoggedIn(true);
      }
    },
    onError: () => {
      setLoginErrorText('Your login failed, please try again.');
    }
  });

  function handleLogin(values) {
    loginMutation(values)
  }

  return (
    <>
      {loginMutationStatus.isLoading ? (
        <LinearProgress variant='query' />
      ) : null}
      {loginMutationStatus.isError ? (
        <>
          <Typography variant='h5' color='error'>
            Something went wrong. Please try again.
          </Typography>
          <Typography color='error'>{loginMutationStatus.error.message}</Typography>
        </>
      ) : null}
      <Typography align='center' variant='h3' gutterBottom>
        Login
      </Typography>
      <form
        css={css`
          display: grid;
          grid-template-columns: auto;
          grid-row-gap: 1rem;
          max-width: 500px;
          margin: 0 auto;
          `}
        onSubmit={handleSubmit(handleLogin)}
        >
        <TextField
          error={!isEmpty(errors.identifier)}
          helperText={errors.identifier ? errors.identifier.message : ''}
          inputRef={register}
          label='Username'
          name='identifier'
          required
          />
        <TextField
          error={!isEmpty(errors.password)}
          helperText={errors.password ? errors.password.message : ''}
          inputRef={register}
          label='Password'
          name='password'
          required
          type='password'
          />
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            `}
          >
          <Button color='primary' type='submit' variant='contained'>Login</Button>
        </div>
        <Typography color='error'>{loginErrorText}</Typography>
      </form>
    </>
  )
}
