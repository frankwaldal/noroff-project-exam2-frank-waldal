/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { Container, Grid, Typography } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import { useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import MapView from '../../components/MapView';
import { BOLD_TEXT, MAIN_TOP_MARGIN } from '../../constants/emotionCSSrules';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import { getSpecificEstablishment } from '../../utils/apiUtils';

export default function EstablishmentPage() {
  const [establishment, setEstablishment] = useState({});
  const { pathname } = useLocation();
  const establishmentId = last(pathname.split('/'));
  const { apiToken, updateApiToken } = useGlobalContext();

  useQuery([apiToken, establishmentId], getSpecificEstablishment, {
    enabled: apiToken !== '' && isEmpty(establishment),
    onSuccess: data => {
      setEstablishment(data);
    },
    onError: data => {
      if (data.statusCode === 401) {
        updateApiToken('');
      }
    }
  });

  return (
    <>
      {!isEmpty(establishment) && (
        <Container css={MAIN_TOP_MARGIN}>
          <Typography align='center' variant='h3' gutterBottom>
            {establishment.establishmentName}
          </Typography>
          <Grid container spacing={2}>
            <Grid item lg={6}>
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
                <span css={BOLD_TEXT}> {establishment.maxGuests}</span>
              </Typography>
              <Typography gutterBottom>
                Selfcatering:
                <span css={BOLD_TEXT}>
                  {establishment.selfCatering ? ' Yes' : ' No'}
                </span>
              </Typography>
              <Typography align='right' css={BOLD_TEXT} gutterBottom>
                Price per night: €{establishment.price},-
              </Typography>
            </Grid>
            <Grid item lg={6}>
              <MapView position={[establishment.latitude, establishment.longitude]} />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}
