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
import CloseIcon from '@material-ui/icons/Close';
import { format } from 'date-fns';
import isEmpty from 'lodash/isEmpty';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { globalStyleTheme } from '../../constants/materialTheme';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import { postNewEnquiry } from '../../utils/apiUtils';

const SEND_ENQUIRY_OVERLAY = css`
  position: fixed;
  bottom: 5rem;
  right: 1rem;
  max-width: 600px;
  padding: 0.75rem;
  background: ${globalStyleTheme.palette.background.default};
  border-radius: 4px;
  box-shadow: 0 0 7px rgba(33, 53, 61, 0.3);
  z-index: 9999;
`;

const validationSchema = yup.object().shape({
  name: yup.string()
    .required('You need to provide a name')
    .min(2, 'Please provide full name'),
  email: yup.string()
    .email('Please provide a valid email')
    .required('You need to provide an email'),
  phone: yup.string(),
  establishmentId: yup.number().required(),
  wantedCheckIn: yup.date(),
  wantedCheckOut: yup.date(),
  message: yup.string()
    .required('You need to provide a message')
    .min(10, 'Please provide a descriptive message'),
})

export default function SendEnquiry({ establishmentId, toggleOpenSendEnquiry }) {
  const [wantedStayDates, setWantedStayDates] = useState(false);
  const { apiToken, updateApiToken } = useGlobalContext();
  const { errors, handleSubmit, register, reset } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const [postNewEnquiryMutation, postNewEnquiryMutationStatus] = useMutation(postNewEnquiry, {
    onSuccess: () => {
      reset();
    },
    onError: data => {
      if (data.statusCode === 401) {
        updateApiToken('');
      }
    },
  });

  function onSubmit(values) {
    const payload = {
      ...values,
      wantedCheckIn: values.wantedCheckIn
        ? format(values.wantedCheckIn, 'yyyy-MM-dd')
        : null,
      wantedCheckOut: values.wantedCheckOut
        ? format(values.wantedCheckOut, 'yyyy-MM-dd')
        : null,
    }
    postNewEnquiryMutation({ apiToken, payload });
    console.log(payload);
    console.log(values);
  }
  return (
    <Container css={SEND_ENQUIRY_OVERLAY}>
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
          margin-bottom: 0.5rem;
          `}
        >
        <Button onClick={toggleOpenSendEnquiry}><CloseIcon /></Button>
      </div>
      <Typography variant='h4' gutterBottom>Send enquiry</Typography>
      {postNewEnquiryMutationStatus.isLoading ? (
        <LinearProgress variant='query' />
      ) : null}
      {postNewEnquiryMutationStatus.isError ? (
        <>
          <Typography variant='h5' color='error'>
            Something went wrong. Please try again.
          </Typography>
          <Typography color='error'>
            {postNewEnquiryMutationStatus.error.message}
          </Typography>
        </>
      ) : null}
      {postNewEnquiryMutationStatus.isSuccess ? (
        <Typography variant='h5' color='primary'>
          Your enquiry was sent successfully.
        </Typography>
      ) : null}
      <form
        css={css`
          display: grid;
          grid-template-columns: auto;
          grid-row-gap: 1rem;
          `}
        onSubmit={handleSubmit(onSubmit)}
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
        <Typography gutterBottom>Which dates do you want to stay with us?</Typography>
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            `}
          >
          <Button
            color='primary' 
            onClick={() => setWantedStayDates(!wantedStayDates)}
            variant='contained'
            >
            {wantedStayDates ? 'Remove dates' : 'Add dates'}
          </Button>
        </div>
        {wantedStayDates && (
          <>
            <TextField
              defaultValue={format(new Date(), 'yyyy-MM-dd')}
              error={!isEmpty(errors.wantedCheckIn)}
              helperText={errors.wantedCheckIn ? errors.wantedCheckIn.message : ''}
              inputRef={register}
              label='Your wanted checkin date'
              name='wantedCheckIn'
              type='date'
              />
            <TextField
              defaultValue={format(new Date(), 'yyyy-MM-dd')}
              error={!isEmpty(errors.wantedCheckOut)}
              helperText={errors.wantedCheckOut ? errors.wantedCheckOut.message : ''}
              inputRef={register}
              label='Your wanted checkout date'
              name='wantedCheckOut'
              type='date'
              />
          </>
        )}
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
        <TextField
          inputRef={register}
          label='Establishment ID'
          name='establishmentId'
          readOnly
          value={establishmentId}
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
