/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';

import { globalStyleTheme } from './materialTheme';

export const LINK_STYLES = css`
  color: inherit;
  text-decoration: none;
  border-bottom: 3px solid transparent;
  transition: border 0.25s ease-out;
  &:hover {
    border-bottom: 3px solid ${globalStyleTheme.palette.text.primary};
  }
`;

export const MAIN_TOP_MARGIN = css`
  margin-top: 0.75rem;
`;
