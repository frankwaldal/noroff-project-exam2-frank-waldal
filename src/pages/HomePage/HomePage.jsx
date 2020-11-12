/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { Container, Grid } from '@material-ui/core';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import BannerImage from '../../assets/bannerImage.png';
import { MAIN_TOP_MARGIN } from '../../constants/emotionCSSrules';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import { getEstablishments } from '../../utils/apiUtils';
import EstablishmentPreview from './EstablishmentPreview';
import EstablishmentSearchArea from './EstablishmentSearchArea';

const SEARCH_BANNER_STYLES = css`
  position: relative;
  width: 100%;
  height: calc(100vw / 7.7);
  min-height: 130px;
  background: content-box url(${BannerImage});
`;

export default function HomePage() {
  const [establishments, setEstablishments] = useState([]);
  const { apiToken, updateApiToken } = useGlobalContext();
  const history = useHistory();

  useQuery(apiToken, getEstablishments, {
    enabled: apiToken !== '' && establishments.length === 0,
    onSuccess: data => {
      setEstablishments(data);
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
      </div>
      <Container css={MAIN_TOP_MARGIN}>
        <Grid container spacing={2}>
          {establishments.map(establishment => (
            <EstablishmentPreview
              key={establishment.establishmentId}
              establishment={establishment}
              />
          ))}
        </Grid>
      </Container>
    </>
  )
}
