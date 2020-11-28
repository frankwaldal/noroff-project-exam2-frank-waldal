/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Checkbox,
  FormLabel,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { queryCache, useMutation } from 'react-query';
import * as yup from 'yup';

import { useGlobalContext } from '../../../context/GlobalContextProvider';
import LocationPicker from './LocationPicker';
import { postNewEstablishment } from '../../../utils/apiUtils';

const validationSchema = yup.object().shape({
  establishmentName: yup.string()
    .required('You need to provide a name')
    .min(2, 'Please provide full name'),
  establishmentEmail: yup.string().email('Please provide a valid email'),
  imageUrl: yup.string()
    .url('You need to provide a valid url to the image')
    .required('You need to provide an image url'),
  price: yup.number()
    .positive('The price needs to be a positive value')
    .required('You need to provide a price'),
  maxGuests: yup.number()
    .positive('The price needs to be a positive value')
    .required('You need to provide maximum number of guessts'),
  latitude: yup.number()
    .required('You need to provide latitude coordinates to the establishment'),
  longitude: yup.number()
    .required('You need to provide longitude coordinates to the establishment'),
  description: yup.string()
    .required('You need to provide a description for your establishment'),
  selfCatering: yup.boolean().required(),
});

export default function AddEstablishment() {
  const { errors, handleSubmit, register, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [positionLatitude, setPositionLatitude] = useState(60.390274071253536);
  const [positionLongitude, setPositionLongitude] = useState(5.333400964736939);
  const { apiToken, updateApiToken } = useGlobalContext();

  const [postNewEstablishmentMutation, postNewEstablishmentMutationStatus] = useMutation(
    postNewEstablishment,
    {
      onSuccess: () => {
        reset();
        queryCache.refetchQueries([apiToken, 'fetchEstablishments']);
      },
      onError: data => {
        if (data.statusCode === 401) {
          updateApiToken('');
        }
      }
    }
  );

  function postEstablishment(values) {
    postNewEstablishmentMutation({ apiToken, payload: values });
  }
  
  return (
    <Grid item lg={12}>
      {postNewEstablishmentMutationStatus.isLoading ? (
        <LinearProgress variant='query' />
      ) : null}
      {postNewEstablishmentMutationStatus.isError ? (
        <>
          <Typography align='center' variant='h5' color='error'>
            Something went wrong. Please try again.
          </Typography>
          <Typography align='center' color='error'>
            {postNewEstablishmentMutationStatus.error.message}
          </Typography>
        </>
      ) : null}
      {postNewEstablishmentMutationStatus.isSuccess ? (
        <Typography align='center' variant='h5' color='primary'>
          Your establishment was added successfully.
        </Typography>
      ) : null}
      <form onSubmit={handleSubmit(postEstablishment)}>
        <Grid container spacing={3}>
          <Grid
            css={css`
              display: grid;
              grid-template-columns: auto;
              grid-row-gap: 1rem;
              `}
            item
            lg={6}
            sm={12}
            >
            <TextField
              error={!isEmpty(errors.establishmentName)}
              helperText={errors.establishmentName ? errors.establishmentName.message : ''}
              inputRef={register}
              label='Establishment name'
              name='establishmentName'
              required
              />
            <TextField
              error={!isEmpty(errors.establishmentEmail)}
              helperText={errors.establishmentEmail ? errors.establishmentEmail.message : ''}
              inputRef={register}
              label='Establishment email'
              name='establishmentEmail'
              />
            <TextField
              error={!isEmpty(errors.imageUrl)}
              helperText={errors.imageUrl ? errors.imageUrl.message : ''}
              inputRef={register}
              label='Image URL'
              name='imageUrl'
              required
              />
            <TextField
              error={!isEmpty(errors.price)}
              helperText={errors.price ? errors.price.message : ''}
              inputRef={register}
              label='Price per night'
              name='price'
              required
              type='number'
              />
            <TextField
              error={!isEmpty(errors.maxGuests)}
              helperText={errors.maxGuests ? errors.maxGuests.message : ''}
              inputRef={register}
              label='Maximum guests accommodation'
              name='maxGuests'
              required
              type='number'
              />
            <TextField
              error={!isEmpty(errors.description)}
              helperText={errors.description ? errors.description.message : ''}
              inputRef={register}
              label='Describe the establishment'
              multiline
              name='description'
              required
              rows='5'
              />
            <FormLabel>
              Does the establishment have self catering?
              <Checkbox
                name='selfCatering'
                inputRef={register}
                />
            </FormLabel>
          </Grid>
          <Grid
            css={css`
              display: grid;
              grid-template-columns: auto;
              grid-row-gap: 1rem;
              `}
            item
            lg={6}
            sm={12}
            >
            <TextField
              error={!isEmpty(errors.latitude)}
              helperText={errors.latitude ? errors.latitude.message : ''}
              inputRef={register}
              label='Latitude coordinates to the establishment'
              name='latitude'
              onChange={event => setPositionLatitude(event.target.value)}
              required
              type='number'
              value={positionLatitude}
              />
            <TextField
              error={!isEmpty(errors.longitude)}
              helperText={errors.longitude ? errors.longitude.message : ''}
              inputRef={register}
              label='Longitude coordinates to the establishment'
              name='longitude'
              onChange={event => setPositionLongitude(event.target.value)}
              required
              type='number'
              value={positionLongitude}
              />
            <LocationPicker
              position={[positionLatitude, positionLongitude]}
              setPositionLatitude={value => setPositionLatitude(value)}
              setPositionLongitude={value => setPositionLongitude(value)}
              />
            <div>
              <Button color='primary' type='submit' variant='contained'>Add establishment</Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
}
