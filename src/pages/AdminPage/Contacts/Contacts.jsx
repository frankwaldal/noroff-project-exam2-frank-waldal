/** @jsxImportSource @emotion/core */

import { Grid, LinearProgress } from '@material-ui/core';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { useGlobalContext } from '../../../context/GlobalContextProvider';
import ContactCard from './ContactCard';
import { getContacts } from '../../../utils/apiUtils';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [enableFetchContacts, setEnableFetchContacts] = useState(true);
  const { apiToken, updateApiToken } = useGlobalContext();

  const fetchingContacts = useQuery(apiToken, getContacts, {
    enabled: apiToken !== '' && enableFetchContacts,
    onSuccess: data => {
      setEnableFetchContacts(false);
      setContacts(data);
    },
    onError: data => {
      if (data.statusCode === 401) {
        updateApiToken('');
      }
    }
  });

  return (
    <>
      {fetchingContacts.isLoading ? (
        <LinearProgress variant='query' />
      ) : null}
      <Grid container spacing={3}>
        {contacts.map(contact => <ContactCard key={contact.id} contact={contact} toggleEnableFetch={() => setEnableFetchContacts(true)} />)}
      </Grid>
    </>
  )
}
