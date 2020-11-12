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
  z-index: 9999;
`;
const NAV_STYLE = css`
  display: flex;
  & li {
    list-style: none;
    margin: 1rem;
  }
`;

export default function Heading() {
  return (
    <header css={HEADER_STYLE}>
      <Typography variant='h2'>
        <Link css={LINK_STYLES} to='/'>Holidaze</Link>
      </Typography>
      <Typography variant='h5'>
        <nav css={NAV_STYLE}>
          <li>
            <NavLink
              activeStyle={{ borderBottom: '3px solid rgba(64, 64, 64, 0.5)' }}
              css={LINK_STYLES}
              to='/contact'
              >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              activeStyle={{ borderBottom: '3px solid rgba(64, 64, 64, 0.5)' }}
              css={LINK_STYLES}
              to='/admin'
              >
              Admin
            </NavLink>
          </li>
        </nav>
      </Typography>
    </header>
  )
}
