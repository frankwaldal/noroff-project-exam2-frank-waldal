/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { Button, Container, LinearProgress, Grid, Typography } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import { useState } from 'react';
import { queryCache, useMutation, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import MapView from '../../components/MapView';
import { MAIN_TOP_MARGIN } from '../../constants/emotionCSSrules';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import SendEnquiry from './SendEnquiry';
import { getSpecificEstablishment, updateSpesificEstablishment } from '../../utils/apiUtils';

export default function EstablishmentPage() {
  const [establishment, setEstablishment] = useState({});
  const { pathname } = useLocation();
  const establishmentId = last(pathname.split('/'));
  const { apiToken, updateApiToken } = useGlobalContext();
  const [openSendEnquiry, toggleOpenSendEnquiry] = useState(false);

  const [updatePageBrowsed] = useMutation(updateSpesificEstablishment, {
    onSuccess: () => {
      queryCache.refetchQueries([apiToken, 'fetchEstablishments']);
    }
  });

  const fetchingEstablishment = useQuery([apiToken, establishmentId], getSpecificEstablishment, {
    enabled: apiToken !== '' && isEmpty(establishment),
    onSuccess: data => {
      setEstablishment(data);
      const newPageBrowsed = data.pageBrowsed + 1;
      const payload = {
        pageBrowsed: newPageBrowsed
      }
      updatePageBrowsed({ apiToken, establishmentId, payload });
    },
    onError: data => {
      if (data.statusCode === 401) {
        updateApiToken('');
      }
    }
  });

  return (
    <>
      {fetchingEstablishment.isLoading ? (
        <LinearProgress variant='query' />
      ) : null}
      {fetchingEstablishment.isError ? (
        <>
          <Typography variant='h5' color='error'>
            Something went wrong. Please try to refresh the page.
          </Typography>
          <Typography color='error'>{fetchingEstablishment.error.message}</Typography>
        </>
      ) : null}
      {!isEmpty(establishment) && (
        <Container css={MAIN_TOP_MARGIN}>
          <Typography align='center' variant='h3' gutterBottom>
            {establishment.establishmentName}
          </Typography>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Typography gutterBottom>{establishment.description}</Typography>
              <img
                css={css`
                  width: 100%;
                  margin: 0.75rem 0;
                  `}
                src={establishment.imageUrl}
                alt={establishment.establishmentName}
                />
              <Typography gutterBottom>
                Max guests:
                <strong> {establishment.maxGuests}</strong>
              </Typography>
              <Typography gutterBottom>
                Selfcatering:
                <strong>
                  {establishment.selfCatering ? ' Yes' : ' No'}
                </strong>
              </Typography>
              <Typography align='right' gutterBottom>
                <strong>Price per night: €{establishment.price},-</strong>
              </Typography>
              <Typography gutterBottom>
                Contact: {establishment.establishmentEmail.replace('@', ' (a) ')}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <MapView position={[establishment.latitude, establishment.longitude]} />
            </Grid>
          </Grid>
        </Container>
      )}
      <Button
        color='primary'
        css={css`
          position: fixed;
          right: 1rem;
          bottom: 1rem;
          `}
        onClick={() => toggleOpenSendEnquiry(!openSendEnquiry)}
        size='large'
        variant='contained'
        >
        <MailOutlineIcon />
      </Button>
      {openSendEnquiry && (
        <SendEnquiry
          establishmentId={establishmentId}
          toggleOpenSendEnquiry={() => toggleOpenSendEnquiry(!openSendEnquiry)}
          />
      )}
    </>
  )
}
