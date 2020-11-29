import { Grid, LinearProgress, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { useGlobalContext } from '../../../context/GlobalContextProvider';
import ContactCard from './ContactCard';
import { getContacts } from '../../../utils/apiUtils';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [successfulDelete, setSuccessfulDelete] = useState(false);
  const { apiToken, updateApiToken } = useGlobalContext();

  const fetchingContacts = useQuery([apiToken, 'fetchContacts'], getContacts, {
    enabled: apiToken !== '',
    onSuccess: data => {
      setContacts(data);
    },
    onError: data => {
      if (data.statusCode === 401) {
        updateApiToken('');
      }
    }
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {fetchingContacts.isLoading ? (
          <LinearProgress variant='query' />
        ) : null}
        {fetchingContacts.isError ? (
          <>
            <Typography variant='h5' color='error'>
              Something went wrong. Please try to refresh the page.
            </Typography>
            <Typography color='error'>{fetchingContacts.error.message}</Typography>
          </>
        ) : null}
        {successfulDelete ? (
          <Typography align='center' variant='h5' color='primary'>
            The contact was deleted successfully.
          </Typography>
        ) : null}
      </Grid>
      {contacts.map(contact => (
        <ContactCard
          key={contact.id}
          contact={contact}
          successfulDeleted={() => setSuccessfulDelete(true)}
          />
      ))}
    </Grid>
  )
}
