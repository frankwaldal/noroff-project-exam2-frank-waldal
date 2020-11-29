/** @jsxImportSource @emotion/core */

import { css } from '@emotion/core';
import { Button, Tab, Tabs } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';

import { globalStyleTheme } from '../../constants/materialTheme';
import { useGlobalContext } from '../../context/GlobalContextProvider';
import Contacts from './Contacts/Contacts';
import Enquiries from './Enquiries/Enquiries';
import Establishments from './Establishments/Establishments';

const TABS_STYLES = css`
  & button {
    background: ${globalStyleTheme.palette.primary.main};
    color: #ffffff;
    opacity: 0.6;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12);
    &:hover {
      opacity: 0.75;
    }
    &:first-of-type {
      border-radius: 4px 0 0 4px;
    }
    &:last-of-type {
      border-radius: 0 4px 4px 0;
    }
    &.Mui-selected {
      opacity: 1;
      &:hover {
        background: #176427;
      }
    }
  }
  & .MuiTabs-indicator {
    display: none;
  }

  & .MuiTab-wrapper {
    @media (max-width: 500px) {
      font-size: 12px;
    }
  }
`;

export default function AdminSection() {
  const { openTab, toggleLoggedIn, updateOpenTab } = useGlobalContext();

  function logOut() {
    localStorage.removeItem('loginToken');
    toggleLoggedIn(false);
  }

  return (
    <>
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
          `}
        >
        <Button
          color='primary'
          css={css`
            position: absolute;
            right: 1rem;

            @media (max-width: 760px) {
              position: relative;
              margin: 1rem;
            }
            `}
          onClick={() => logOut()}
          variant='contained'
          >
          Log out
        </Button>
      </div>
      <Tabs
        centered
        css={TABS_STYLES}
        indicatorColor='primary'
        onChange={(e, value) => updateOpenTab(value)}
        value={openTab}
        >
        <Tab label='Enquiries' value='enquiries' />
        <Tab label='Contacts' value='contacts' />
        <Tab label='Establishments' value='establishments' />
      </Tabs>
      <TabContext value={openTab}>
        <TabPanel value='enquiries'>
          <Enquiries />
        </TabPanel>
        <TabPanel value='contacts'>
          <Contacts />
        </TabPanel>
        <TabPanel value='establishments'>
          <Establishments />
        </TabPanel>
      </TabContext>
    </>
  )
}
