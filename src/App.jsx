import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Heading from './components/Heading';
import { globalStyleTheme } from './constants/materialTheme';
import GlobalContextProvider from './context/GlobalContextProvider';
import AdminPage from './pages/AdminPage/AdminPage';
import ContactPage from './pages/ContactPage/ContactPage';
import EstablishmentPage from './pages/EstablishmentPage/EstablishmentPage';
import HomePage from './pages/HomePage/HomePage';

export default function App() {
  return(
    <ThemeProvider theme={globalStyleTheme}>
      <GlobalContextProvider>
        <CssBaseline />
        <Router>
          <Heading />
          <Switch>
            <Route path='/' exact>
              <HomePage />
            </Route>
            <Route path='/contact'>
              <ContactPage />
            </Route>
            <Route path='/admin'>
              <AdminPage />
            </Route>
            <Route path='/establishment'>
              <EstablishmentPage />
            </Route>
          </Switch>
        </Router>
      </GlobalContextProvider>
    </ThemeProvider>
  )
}
