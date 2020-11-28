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
import CloseIcon from '@material-ui/icons/Close';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { queryCache, useMutation } from 'react-query';
import * as yup from 'yup';

import { useGlobalContext } from '../../../context/GlobalContextProvider';
import LocationPicker from './LocationPicker';
import { updateSpesificEstablishment } from '../../../utils/apiUtils';

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

export default function UpdateEstablishment({
  establishmentId,
  establishments,
  toggleEditEstablishment,
}) {
  const { errors, handleSubmit, register } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { apiToken, updateApiToken } = useGlobalContext();
  const establishment = head(establishments.filter(establishment => establishment.id === establishmentId));
  const [selfcateringChecked, setSelfCateringChecked] = useState(establishment.selfCatering);
  const [positionLatitude, setPositionLatitude] = useState(establishment.latitude);
  const [positionLongitude, setPositionLongitude] = useState(establishment.longitude);

  const [updateEstablishmentMutation, updateEstablishmentMutationStatus] = useMutation(
    updateSpesificEstablishment,
    {
      onSuccess: () => {
        queryCache.refetchQueries([apiToken, 'fetchEstablishments']);
      },
      onError: data => {
        if (data.statusCode === 401) {
          updateApiToken('');
        }
      }
    }
  );

  function updateEstablishment(values) {
    console.log(values);
    updateEstablishmentMutation({ apiToken, establishmentId, payload: values });
  }

  return (
    <>
      <Grid item lg={12}>
        <Button
          color='primary'
          endIcon={<CloseIcon />}
          onClick={() => toggleEditEstablishment(0)}
          variant='contained'
          >
          Close establishment edit
        </Button>
      </Grid>
      <Grid item lg={12}>
        {updateEstablishmentMutationStatus.isError ? (
          <>
            <Typography align='center' variant='h5' color='error'>
              Something went wrong. Please try again.
            </Typography>
            <Typography align='center' color='error'>
              {updateEstablishmentMutationStatus.error.message}
            </Typography>
          </>
        ) : null}
        {updateEstablishmentMutationStatus.isSuccess ? (
          <Typography align='center' variant='h5' color='primary'>
            Your establishment was updated successfully.
          </Typography>
        ) : null}
        <form onSubmit={handleSubmit(updateEstablishment)}>
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
                defaultValue={establishment.establishmentName}
                error={!isEmpty(errors.establishmentName)}
                helperText={errors.establishmentName ? errors.establishmentName.message : ''}
                inputRef={register}
                label='Establishment name'
                name='establishmentName'
                required
                />
              <TextField
                defaultValue={establishment.establishmentEmail}
                error={!isEmpty(errors.establishmentEmail)}
                helperText={errors.establishmentEmail ? errors.establishmentEmail.message : ''}
                inputRef={register}
                label='Establishment email'
                name='establishmentEmail'
                />
              <TextField
                defaultValue={establishment.imageUrl}
                error={!isEmpty(errors.imageUrl)}
                helperText={errors.imageUrl ? errors.imageUrl.message : ''}
                inputRef={register}
                label='Image URL'
                name='imageUrl'
                required
                />
              <TextField
                defaultValue={establishment.price}
                error={!isEmpty(errors.price)}
                helperText={errors.price ? errors.price.message : ''}
                inputRef={register}
                label='Price per night'
                name='price'
                required
                type='number'
                />
              <TextField
                defaultValue={establishment.maxGuests}
                error={!isEmpty(errors.maxGuests)}
                helperText={errors.maxGuests ? errors.maxGuests.message : ''}
                inputRef={register}
                label='Maximum guests accommodation'
                name='maxGuests'
                required
                type='number'
                />
              <TextField
                defaultValue={establishment.description}
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
                  checked={selfcateringChecked}
                  label='Does the establishment have self catering?'
                  name='selfCatering'
                  onChange={() => setSelfCateringChecked(!selfcateringChecked)}
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
                <Button color='primary' type='submit' variant='contained'>
                  Update establishment
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  )
}
