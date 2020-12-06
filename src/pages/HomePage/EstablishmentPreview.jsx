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
  const link = `/establishment/${establishment.id}`;

  return (
    <Grid item lg={4} md={6} xs={12}>
      <Link css={LINK_STYLES} to={link}>
        <Card
          css={css`
            &:hover {
              box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 2px 3px 3px 2px rgba(0,0,0,0.14), 2px 3px 5px 2px rgba(0,0,0,0.12);
            }
            `}
          >
          <CardHeader title={establishment.establishmentName} />
          <CardMedia
            image={establishment.imageUrl}
            style={{ height: '200px' }}
            title={establishment.establishmentName}
            />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography gutterBottom>
                  {establishment.description}
                </Typography>
              </Grid>
              <Grid item style={{ alignSelf: 'flex-end' }} xs={4}>
                <Typography
                  align='right'
                  gutterBottom
                  >
                  <strong>Price: €{establishment.price},-</strong>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  )
}
