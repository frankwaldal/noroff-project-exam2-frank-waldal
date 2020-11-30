/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { CircularProgress, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import sortBy from 'lodash/sortBy';
import { useHistory } from 'react-router-dom';

import { globalStyleTheme } from '../../constants/materialTheme';
import { useGlobalContext } from '../../context/GlobalContextProvider';

const ESTABLISHMENT_AREA_STYLES = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: max-content;
  padding: 0.75rem 2.5rem;
  border-radius: 5px;
  background: ${globalStyleTheme.palette.background.default};
  box-shadow: 0 0 7px rgba(33, 53, 61, 0.3);

  @media (max-width: 600px) {
    width: 100vw;
    height: max-content;
  }
`;
const SEARCHBOX_STYLES = css`
  width: 80%;
  margin: 0.5rem auto;
`;

export default function EstablishmentSearchBox() {
  const { establishments } = useGlobalContext();
  const history = useHistory();

  function goToEstablishment(value) {
    if (value) {
      const path = `/establishment/${value.id}`;
      history.push(path);
    }
  }

  return(
    <div css={ESTABLISHMENT_AREA_STYLES}>
      <Typography variant='h4'>Search for a place to stay</Typography>
      <Autocomplete
        css={SEARCHBOX_STYLES}
        id='establishment-search'
        getOptionLabel={(establishment) => establishment.establishmentName}
        loading={establishments.length === 0}
        onChange={(e, value) => goToEstablishment(value)}
        options={sortBy(establishments, 'establishmentName')}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Search establishment'
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {establishments.length === 0 ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            />
        )}
        />
    </div>
  )
}
