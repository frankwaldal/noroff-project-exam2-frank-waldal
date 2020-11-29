import { Button, Grid, LinearProgress, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { useGlobalContext } from '../../../context/GlobalContextProvider';
import AddEstablishment from './AddEstablishment';
import EstablishmentCard from './EstablishmentCard';
import UpdateEstablishment from './UpdateEstablishment';
import { getEstablishments } from '../../../utils/apiUtils';

export default function Establishments() {
  const [openAddEstablishment, setOpenAddEstablishment] = useState(false);
  const [openEditEstablishment, setOpenEditEstablishment] = useState(0);
  const [successfulDelete, setSuccessfulDelete] = useState(false);
  const { apiToken, establishments, updateApiToken, updateEstablishments } = useGlobalContext();

  const fetchingEstablishments = useQuery([apiToken, 'fetchEstablishments'], getEstablishments, {
    enabled: apiToken !== '',
    onSuccess: data => {
      updateEstablishments(reverse(sortBy(data, 'pageBrowsed')));
    },
    onError: data => {
      if (data.statusCode === 401) {
        updateApiToken('');
      }
    },
  });

  return (
    <Grid container spacing={3}>
      {fetchingEstablishments.isLoading ? (
        <LinearProgress variant='query' />
      ) : null}
      {fetchingEstablishments.isError ? (
        <>
          <Typography variant='h5' color='error'>
            Something went wrong. Please try to refresh the page.
          </Typography>
          <Typography color='error'>
            {fetchingEstablishments.error.message}
          </Typography>
        </>
      ) : null}
      {successfulDelete ? (
        <Grid item xs={12}>
          <Typography align='center' variant='h5' color='primary'>
            The establishment was deleted successfully.
          </Typography>
        </Grid>
      ) : null}
      {!openEditEstablishment && <Grid item lg={12}>
        <Button
          color='primary'
          endIcon={openAddEstablishment ? <CloseIcon /> : <AddIcon />}
          onClick={() => setOpenAddEstablishment(!openAddEstablishment)}
          variant='contained'
          >
          {openAddEstablishment ? 'Close add establishment' : 'Add new establishment'}
        </Button>
      </Grid>}
      {openAddEstablishment ? (
        <AddEstablishment />
      ) : openEditEstablishment !== 0 ? (
        <UpdateEstablishment
          establishmentId={openEditEstablishment}
          establishments={establishments}
          toggleEditEstablishment={(value) => setOpenEditEstablishment(value)}
          />
      ) : (
        <>
          {sortBy(establishments, 'establishmentName').map(establishment => (
            <EstablishmentCard
              key={establishment.id}
              establishment={establishment}
              successfulDeleted={() => setSuccessfulDelete(true)}
              toggleEditEstablishment={(value) => setOpenEditEstablishment(value)}
              />
          ))}
        </>
      )}
    </Grid>
  )
}
