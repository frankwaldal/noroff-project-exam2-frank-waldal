import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
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
          <Header />
          <Switch>
            <Route path='/fed/pe2' exact>
              <HomePage />
            </Route>
            <Route path='/fed/pe2/contact'>
              <ContactPage />
            </Route>
            <Route path='/fed/pe2/admin'>
              <AdminPage />
            </Route>
            <Route path='/fed/pe2/establishment'>
              <EstablishmentPage />
            </Route>
          </Switch>
        </Router>
      </GlobalContextProvider>
    </ThemeProvider>
  )
}
