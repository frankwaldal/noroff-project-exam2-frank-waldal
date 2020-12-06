/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { Button, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { LINK_STYLES } from '../../../constants/emotionCSSrules';
import { globalStyleTheme } from '../../../constants/materialTheme';

export const EXPANDED_CARD_STYLES = css`
  position: fixed;
  top: 100px;
  right: 1rem;
  max-width: 600px;
  padding: 0.75rem;
  background: ${globalStyleTheme.palette.background.default};
  border-radius: 4px;
  box-shadow: 0 0 7px rgba(33, 53, 61, 0.3);
  z-index: 100;

  @media (max-width: 630px) {
    width: calc(100vw - 2rem);
    max-height: calc(100vh - 7rem);
    overflow-y: auto;
  }
`;

export default function ContactCardExpanded({ contact, toggleExpandCard }) {
  const mailtoLink = `mailto:${contact.email}`;
  const messageSegments = contact.message.split('\n');
  return (
    <div css={EXPANDED_CARD_STYLES}>
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
          margin-bottom: 0.5rem;
          `}
        >
        <Button onClick={toggleExpandCard}><CloseIcon /></Button>
      </div>
      <Typography gutterBottom><strong>Name: </strong>{contact.name}</Typography>
      <Typography gutterBottom>
        <strong>Email: </strong><a href={mailtoLink} css={LINK_STYLES}>{contact.email}</a>
      </Typography>
      <Typography gutterBottom><strong>Phone: </strong>{contact.phone}</Typography>
      <Typography gutterBottom>
        <strong>Message: </strong>
        {messageSegments.map((messageSegment, index) => (
          <span key={messageSegment+index}>{messageSegment}<br /></span>
        ))}
      </Typography>
    </div>
  )
}
