import React from 'react';
import GlobalStyle from './styles/global'
import { Router } from 'react-router-dom'
import Routes from './routes'
import Header from './components/Header/'
import { Provider } from 'react-redux'
import './config/ReactotronConfig'
import store from './store'
import history from './config/HistoryConfig'

import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <GlobalStyle />
        <Header />
        <Routes />
      </Router>
      <ToastContainer autoClear="8000" />
    </Provider>
  );
}

export default App;
