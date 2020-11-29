/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { LINK_STYLES } from '../../constants/emotionCSSrules';

export default function EstablishmentPreview({ establishment }) {
  const link = `/fed/pe2/establishment/${establishment.id}`;

  return (
    <Grid item lg={4} md={6} xs={12}>
      <Card>
        <Link css={LINK_STYLES} to={link}>
          <CardHeader title={establishment.establishmentName} />
          <CardMedia
            css={css`height: 200px;`}
            image={establishment.imageUrl}
            title={establishment.establishmentName}
            />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography gutterBottom>
                  {establishment.description}
                </Typography>
              </Grid>
              <Grid css={css`align-self: flex-end;`} item xs={4}>
                <Typography
                  align='right'
                  gutterBottom
                  >
                  <strong>Price: €{establishment.price},-</strong>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Link>
      </Card>
    </Grid>
  )
}
