import React from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import CONFIG from 'config';
import store from 'redux/store';
import history from 'redux/history';
import Home from 'containers/Home/Home';
import MyDiets from 'containers/MyDiets/MyDiets';
import MyDietContainer from 'containers/MyDiet/MyDiet';
import ViewDiet from 'containers/ViewDiet/ViewDiet';
import ManageFood from 'containers/ManageFood/ManageFood';
import ErrorPage from 'containers/ErrorPage/ErrorPage';

import { ThemeProvider, CssBaseline } from '@material-ui/core';
import myTheme from './myTheme';
import 'typeface-roboto';


function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CssBaseline />
        <ThemeProvider theme={myTheme}>
          <Switch>
            <Route path={`${CONFIG.UI_URL.VIEWDIET}/:shareId`} component={ViewDiet} />
            <Route path={`${CONFIG.UI_URL.VIEWDIET}`} component={ViewDiet} />
            <Route exact path={CONFIG.UI_URL.HOME} component={Home} />
            <Route path={CONFIG.UI_URL.MY_DIETS} component={MyDiets} />
            <Route path={`${CONFIG.UI_URL.MYDIET}/:dietId/food`} component={ManageFood} />
            <Route path={`${CONFIG.UI_URL.MYDIET}/:dietId`} component={MyDietContainer} />
            <Route path="/error/404" component={ErrorPage} />
            <Redirect to={CONFIG.UI_URL.ERROR('404')} />
          </Switch>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
