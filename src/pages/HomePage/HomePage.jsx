/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { Container, Grid, LinearProgress, Typography } from '@material-ui/core';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import BannerImage from '../../assets/bannerImage.png';
import { LINK_STYLES, MAIN_TOP_MARGIN } from '../../constants/emotionCSSrules';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import { getEstablishments } from '../../utils/apiUtils';
import EstablishmentPreview from './EstablishmentPreview';
import EstablishmentSearchArea from './EstablishmentSearchArea';

const SEARCH_BANNER_STYLES = css`
  position: relative;
  width: 100%;
  height: calc(100vw / 7.7);
  min-height: 130px;
  background: url(${BannerImage});
  background-size: cover;

  @media (max-width: 600px) {
    height: 170px;
  }
`;
const ATTRIBUTION_LINK_STYLE = css`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0.75rem;
  font-size: 0.5rem;

  @media (max-width: 600px) {
    display: none;
  }
`;

export default function HomePage() {
  const [establishments, setEstablishments] = useState([]);
  const { apiToken, updateApiToken } = useGlobalContext();
  const history = useHistory();

  const fetchingEstablishments = useQuery(apiToken, getEstablishments, {
    enabled: apiToken !== '' && establishments.length === 0,
    onSuccess: data => {
      setEstablishments(reverse(sortBy(data, 'pageBrowsed')));
    },
    onError: data => {
      if (data.statusCode === 401) {
        updateApiToken('');
      }
    }
  });

  function goToEstablishment(value) {
    const path = `/establishment/${value.id}`;
    history.push(path);
  }

  return (
    <>
      <div css={SEARCH_BANNER_STYLES}>
        <EstablishmentSearchArea
          establishments={establishments}
          goToEstablishment={goToEstablishment}
          />
        <Typography css={css`color: #fafafa;`}>
          <a
            css={[ATTRIBUTION_LINK_STYLE, LINK_STYLES]}
            href='https://unsplash.com/photos/2H0FmDFWL-w'
            rel='noopener noreferrer'
            target='_blank'
            >
            Bergen cityscape by Kuno Schweizer
          </a>
        </Typography>
      </div>
      <Container css={MAIN_TOP_MARGIN}>
        {fetchingEstablishments.isLoading ? (
          <LinearProgress variant='query' />
        ) : null}
        <Grid container spacing={2}>
          {establishments.map(establishment => (
            <EstablishmentPreview
              key={establishment.id}
              establishment={establishment}
              />
          ))}
        </Grid>
      </Container>
    </>
  )
}
