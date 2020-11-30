/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { Container, Typography } from '@material-ui/core';

import FacebookLogo from '../assets/flogo_RGB_HEX-72.svg';
import InstagramLogo from '../assets/glyph-logo_May2016.png';
import TripadvisorLogo from '../assets/tripadvisor_main_black.svg';

const LOGO_STYLES = css`
  height: 3rem;
  margin: 0.75rem;
  cursor: pointer;
`;

export default function Footer() {
  return (
    <footer
      css={css`
        padding: 1rem 0;
        width: 100%;
        `}
      >
      <Container
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          `}
        >
        <div
          css={css`
            display: flex;
            justify-content: center;
            `}
          >
          <img css={LOGO_STYLES} src={FacebookLogo} alt='Facebook logo' />
          <img css={LOGO_STYLES} src={InstagramLogo} alt='Facebook logo' />
          <img css={LOGO_STYLES} src={TripadvisorLogo} alt='Facebook logo' />
        </div>
        <Typography align='center' gutterBottom>&#169; 2020 - Frank Waldal</Typography>
      </Container>
    </footer>
  )
}
