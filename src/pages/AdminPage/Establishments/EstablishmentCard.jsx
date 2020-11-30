/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { Button, Grid, LinearProgress, Tooltip, Typography } from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditIcon from '@material-ui/icons/Edit';
import { queryCache, useMutation } from 'react-query';
import { Link } from 'react-router-dom';

import { LINK_STYLES } from '../../../constants/emotionCSSrules';
import { useGlobalContext } from '../../../context/GlobalContextProvider';
import { deleteSpecificEstablishment } from '../../../utils/apiUtils';

export default function EstablishmentCard({ establishment, successfulDeleted, toggleEditEstablishment }) {
  const link = `/establishment/${establishment.id}`;
  const { apiToken, updateApiToken } = useGlobalContext();

  const [deleteEstablishmentMutation, deleteEstablishmentMutationStatus] = useMutation(
    deleteSpecificEstablishment,
    {
      onSuccess: () => {
        queryCache.refetchQueries([apiToken, 'fetchEstablishments']);
        successfulDeleted();
      },
      onError: data => {
        if (data.statusCode === 401) {
          updateApiToken('');
        }
      },
    }
  );

  function deleteEstablishment() {
    const establishmentId = establishment.id;
    deleteEstablishmentMutation({ apiToken, establishmentId });
  }

  return (
    <>
      {deleteEstablishmentMutationStatus.isLoading ? (
        <LinearProgress variant='query' />
      ) : null}
      {deleteEstablishmentMutationStatus.isError ? (
        <>
          <Typography variant='h5' color='error'>
            Something went wrong. Please try again.
          </Typography>
          <Typography color='error'>
            {deleteEstablishmentMutationStatus.error.message}
          </Typography>
        </>
      ) : null}
      <Grid item lg={6} xs={12}>
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
          <Grid item xs={12}>
            <Typography variant='h5' align='center' gutterBottom>
              <Link css={LINK_STYLES} to={link}>
                {establishment.establishmentName}
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9} lg={8}>
            <Typography gutterBottom>{establishment.description}</Typography>
            <Typography gutterBottom>
              <strong>Page visited: </strong>{establishment.pageBrowsed}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} lg={4}>
            <Tooltip title='Delete establishment'>
              <Button onClick={() => deleteEstablishment()}>
                <DeleteForeverOutlinedIcon />
              </Button>
            </Tooltip>
            <Tooltip title='Edit establishment'>
              <Button onClick={() => toggleEditEstablishment(establishment.id)}>
                <EditIcon />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
