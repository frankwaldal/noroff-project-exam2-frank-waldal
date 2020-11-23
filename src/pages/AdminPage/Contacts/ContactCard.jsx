/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { Button, Grid, LinearProgress, Typography } from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { useState } from 'react';
import { useMutation } from 'react-query';

import { useGlobalContext } from '../../../context/GlobalContextProvider';
import ContactCardExpanded from './ContactCardExpanded';
import { deleteSpecificContact } from '../../../utils/apiUtils';

export default function ContactCard({ contact, toggleEnableFetch }){
  const [openExpandedCard, setOpenExpandedCard] = useState(false);
  const { apiToken, updateApiToken } = useGlobalContext();

  const [deleteContactMutation, deleteContactMutationStatus] = useMutation(deleteSpecificContact, {
    onSuccess: () => {
      toggleEnableFetch();
    },
    onError: data => {
      if (data.statusCode === 401) {
        updateApiToken('');
      }
    }
  });

  function deleteContact() {
    const contactId = contact.id;
    deleteContactMutation({ apiToken, contactId });
  }

  return (
    <>
      {deleteContactMutationStatus.isLoading ? (
        <LinearProgress variant='query' />
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
          <Grid item lg={4}>
            <Typography>{contact.name}</Typography>
            <Typography>
              {contact.message.length > 17
                ? `${contact.message.substring(0,17)}...`
                : contact.message}
            </Typography>
          </Grid>
          <Grid item lg={5}>
            <Typography>{contact.email}</Typography>
            <Typography>{contact.phone}</Typography>
          </Grid>
          <Grid
            css={css`
              display: flex;
              justify-content: space-between;
              `}
            item
            lg={3}
            >
            <Button onClick={() => deleteContact()}><DeleteForeverOutlinedIcon /></Button>
            <Button onClick={() => setOpenExpandedCard(!openExpandedCard)}><OpenInNewIcon /></Button>
          </Grid>
        </Grid>
      </Grid>
      {openExpandedCard && <ContactCardExpanded contact={contact} toggleExpandCard={() => setOpenExpandedCard(!openExpandedCard)} />}
    </>
  )
}
