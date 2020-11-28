/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { Button, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { format } from 'date-fns';

import { LINK_STYLES } from '../../../constants/emotionCSSrules';
import { EXPANDED_CARD_STYLES } from '../Contacts/ContactCardExpanded';

export default function EnquiryCardExpanded({ enquiry, establishmentName, toggleExpandCard }) {
  const mailtoLink = `mailto:${enquiry.email}`;
  const messageSegments = enquiry.message.split('\n');

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
      <Typography variant='h5' align='center' gutterBottom>
        {establishmentName}
      </Typography>
      <Typography gutterBottom><strong>Name: </strong>{enquiry.name}</Typography>
      <Typography gutterBottom>
        <strong>Email: </strong><a href={mailtoLink} css={LINK_STYLES}>{enquiry.email}</a>
      </Typography>
      <Typography gutterBottom><strong>Phone: </strong>{enquiry.phone}</Typography>
      {enquiry.wantedCheckIn != null
        ? <Typography gutterBottom>
            <strong>From: </strong>{format(new Date(enquiry.wantedCheckIn), 'do MMM yyyy')}
          </Typography>
        : null}
      {enquiry.wantedCheckOut != null
        ? <Typography gutterBottom>
            <strong>To: </strong>{format(new Date(enquiry.wantedCheckOut), 'do MMM yyyy')}
          </Typography>
        : null}
      <Typography gutterBottom>
        <strong>Message: </strong>
        {messageSegments.map((messageSegment, index) => (
          <span key={messageSegment+index}>{messageSegment}<br /></span>
        ))}
      </Typography>
    </div>
  )
}
