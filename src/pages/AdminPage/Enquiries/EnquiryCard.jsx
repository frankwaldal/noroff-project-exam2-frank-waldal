/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { Button, Grid, LinearProgress, Tooltip, Typography } from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { format } from 'date-fns';
import { useState } from 'react';
import {queryCache, useMutation, useQuery } from 'react-query'

import { useGlobalContext } from '../../../context/GlobalContextProvider';
import EnquiryCardExpanded from './EnquiryCardExpanded';
import { deleteSpecificEnquiry, getSpecificEstablishment } from '../../../utils/apiUtils';

export default function EnquiryCard({ enquiry, successfulDeleted }) {
  const [establishmentName, setEstablishmentName] = useState('');
  const [openExpandedCard, setOpenExpandedCard] = useState(false);
  const { apiToken, updateApiToken } = useGlobalContext();

  const [deleteEnquiryMutation, deleteEnquiryMutationStatus] = useMutation(deleteSpecificEnquiry, {
    onSuccess: () => {
      queryCache.refetchQueries([apiToken, 'fetchEnquiries']);
      successfulDeleted();
    },
    onError: data => {
      if (data.statusCode === 401) {
        updateApiToken('');
      }
    },
  });

  function deleteEnquiry() {
    const enquiryId = enquiry.id;
    deleteEnquiryMutation({ apiToken, enquiryId });
  }

  const fetchingEstablishment = useQuery(
    [apiToken, enquiry.establishmentId],
    getSpecificEstablishment,
    {
      enabled: establishmentName === '' && apiToken !== '',
      onSettled: data => {
        setEstablishmentName(data.establishmentName);
      },
      onError: data => {
        if (data.statusCode === 401) {
          updateApiToken('');
        }
      },
    }
  );

  return (
    <>
      {deleteEnquiryMutationStatus.isLoading ? (
        <LinearProgress variant='query' />
      ) : null}
      {deleteEnquiryMutationStatus.isError ? (
        <>
          <Typography variant='h5' color='error'>
            Something went wrong. Please try again.
          </Typography>
          <Typography color='error'>
            {deleteEnquiryMutationStatus.error.message}
          </Typography>
        </>
      ) : null}
      <Grid item lg={6} md={12}>
        <Grid
          container
          css={css`
            padding: 0.75rem;
            border-radius: 4px;
            box-shadow: 0 0 7px rgba(33, 53, 61, 0.3);
            justify-content: space-around;
            `}
          spacing={2}
          >
          <Grid item lg={12}>
            <Typography variant='h5' align='center' gutterBottom>
              {fetchingEstablishment.isLoading
                ? <LinearProgress variant='query' />
                : establishmentName}
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <Typography>{enquiry.name}</Typography>
            <Typography>
              {enquiry.message.length > 17
                ? `${enquiry.message.substring(0,17)}...`
                : enquiry.message}
            </Typography>
            <Typography>{enquiry.phone}</Typography>
          </Grid>
          <Grid item lg={5}>
            <Typography>{enquiry.email}</Typography>
            {enquiry.wantedCheckIn != null
              ? <Typography gutterBottom>
                  From: {format(new Date(enquiry.wantedCheckIn), 'do MMM yyyy')}
                </Typography>
              : null}
            {enquiry.wantedCheckOut != null
              ? <Typography gutterBottom>
                  To: {format(new Date(enquiry.wantedCheckOut), 'do MMM yyyy')}
                </Typography>
              : null}
          </Grid>
          <Grid>
            <Tooltip title='Delete enquiry'>
              <Button onClick={() => deleteEnquiry()}>
                <DeleteForeverOutlinedIcon />
              </Button>
            </Tooltip>
            <Tooltip title='Open expanded view'>
              <Button onClick={() => setOpenExpandedCard(!openExpandedCard)}>
                <OpenInNewIcon />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      {openExpandedCard && (
        <EnquiryCardExpanded
          enquiry={enquiry}
          establishmentName={establishmentName}
          toggleExpandCard={() => setOpenExpandedCard(!openExpandedCard)}
          />
      )}
    </>
  )
}
