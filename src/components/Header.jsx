/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { Typography } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';

import { LINK_STYLES } from '../constants/emotionCSSrules';
import { globalStyleTheme } from '../constants/materialTheme';

const HEADER_STYLE = css`
  position: sticky;
  top: 0;
  width: 100%;
  padding: 0.75rem;
  background: ${globalStyleTheme.palette.background.default};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  box-shadow: 0 0 7px rgba(33, 53, 61, 0.3);
  z-index: 1000;
`;
const NAV_STYLE = css`
  display: flex;
  & li {
    list-style: none;
    margin: 1rem;
  }
`;

export default function Header() {

  return (
    <header css={HEADER_STYLE}>
      <Typography
        css={css`
          @media (max-width: 600px) {
            font-size: 2rem;
          }
          `}
        variant='h2'
        >
        <Link css={LINK_STYLES} to='/fed/pe2'>Holidaze</Link>
      </Typography>
      <Typography
        css={css`
          @media (max-width: 600px) {
            font-size: 1rem;
          }
          `}
        variant='h5'
        >
        <nav css={NAV_STYLE}>
          <li>
            <NavLink
              activeStyle={{ borderBottom: '3px solid rgba(64, 64, 64, 0.5)' }}
              css={LINK_STYLES}
              to='/fed/pe2/contact'
              >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              activeStyle={{ borderBottom: '3px solid rgba(64, 64, 64, 0.5)' }}
              css={LINK_STYLES}
              to='/fed/pe2/admin'
              >
              Admin
            </NavLink>
          </li>
        </nav>
      </Typography>
    </header>
  )
}
