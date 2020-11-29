import { Grid, LinearProgress, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { useGlobalContext } from '../../../context/GlobalContextProvider';
import EnquiryCard from './EnquiryCard';
import { getEnquiries } from '../../../utils/apiUtils';

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [successfulDelete, setSuccessfulDelete] = useState(false);
  const { apiToken, updateApiToken } = useGlobalContext();

  const fetchingEnquiries = useQuery([apiToken, 'fetchEnquiries'], getEnquiries, {
    enabled: apiToken !== '',
    onSettled: data => {
      setEnquiries(data);
    },
    onError: data => {
      if (data.statusCode === 401) {
        updateApiToken('');
      }
    },
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {fetchingEnquiries.isLoading ? (
          <LinearProgress variant='query' />
        ) : null}
        {fetchingEnquiries.isError ? (
          <>
            <Typography variant='h5' color='error'>
              Something went wrong. Please try to refresh the page.
            </Typography>
            <Typography color='error'>{fetchingEnquiries.error.message}</Typography>
          </>
        ) : null}
        {successfulDelete ? (
          <Typography align='center' variant='h5' color='primary'>
            The enquiry was deleted successfully.
          </Typography>
        ) : null}
      </Grid>
      {enquiries.map(enquiry => (
        <EnquiryCard
          key={enquiry.id}
          enquiry={enquiry}
          successfulDeleted={() => setSuccessfulDelete(true)}
          />
      ))}
    </Grid>
  )
}
