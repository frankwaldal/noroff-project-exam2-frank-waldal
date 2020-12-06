/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { Container, Typography } from '@material-ui/core';

import FacebookLogo from '../assets/flogo_RGB_HEX-72.svg';
import InstagramLogo from '../assets/glyph-logo_May2016.png';
import TripadvisorLogo from '../assets/tripadvisor_main_black.svg';

const LOGO_STYLES = css`
  height: 3rem;
  margin: 0.75rem;
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
          <a
            href='https://facebook.com'
            rel='noopener noreferrer'
            target='_blank'
            >
            <img css={LOGO_STYLES} src={FacebookLogo} alt='Facebook logo' />
          </a>
          <a
            href='https://instagram.com'
            rel='noopener noreferrer'
            target='_blank'
            >
            <img css={LOGO_STYLES} src={InstagramLogo} alt='Instagram logo' />
          </a>
          <a
            href='https://tripadvisor.com'
            rel='noopener noreferrer'
            target='_blank'
            >
            <img css={LOGO_STYLES} src={TripadvisorLogo} alt='Tripadvisor logo' />
          </a>
        </div>
        <Typography align='center' gutterBottom>&#169; 2020 - Frank Waldal</Typography>
      </Container>
    </footer>
  )
}
