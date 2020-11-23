/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Container,
  LinearProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { useGlobalContext } from '../../context/GlobalContextProvider';
import { postNewContact } from '../../utils/apiUtils';

const validationSchema = yup.object().shape({
  name: yup.string()
    .required('You need to provide a name')
    .min(2, 'Please provide full name'),
  email: yup.string()
    .email('Please provide a valid email')
    .required('You need to provide an email'),
  phone: yup.string(),
  message: yup.string()
    .required('You need to provide a message')
    .min(10, 'Please provide a descriptive message'),
});

export default function ContactPage() {
  const { errors, handleSubmit, register, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { apiToken, updateApiToken } = useGlobalContext();

  const [postNewContactMutation, postNewContactMutationStatus] = useMutation(postNewContact, {
    onSuccess: () => {
      reset();
    },
    onError: data => {
      if (data.statusCode === 401) {
        updateApiToken('');
      }
    }
  })
  function postContact(values) {
    postNewContactMutation({ apiToken, payload: values });
  }
  return (
    <Container>
      <Typography align='center' variant='h3' gutterBottom>
        Contact
      </Typography>
      {postNewContactMutationStatus.isLoading ? (
        <LinearProgress variant='query' />
      ) : null}
      <form
        css={css`
          display: grid;
          grid-template-columns: auto;
          grid-row-gap: 1rem;
          max-width: 600px;
          margin: 0 auto;
          `}
        onSubmit={handleSubmit(postContact)}
        >
        <TextField
          error={!isEmpty(errors.name)}
          helperText={errors.name ? errors.name.message : ''}
          inputRef={register}
          label='Your name'
          name='name'
          required
          />
        <TextField
          error={!isEmpty(errors.email)}
          helperText={errors.email ? errors.email.message : ''}
          inputRef={register}
          label='Your email'
          name='email'
          required
          />
        <TextField
          error={!isEmpty(errors.phone)}
          helperText={errors.phone ? errors.phone.message : ''}
          inputRef={register}
          label='Your phonenumber'
          name='phone'
          />
        <TextField
          error={!isEmpty(errors.message)}
          helperText={errors.message ? errors.message.message : ''}
          inputRef={register}
          label='Your message'
          name='message'
          multiline
          required
          rows='5'
          />
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            `}
          >
          <Button color='primary' type='submit' variant='contained'>Send</Button>
        </div>
      </form>
    </Container>
  )
}
