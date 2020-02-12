import React from 'react';
import ReactDOM from 'react-dom';
import './fonts/fonts.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 16px;
  font-family: 'Roboto', Verdana, Arial, Helvetica, sans-serif;
  font-weight: 300;
  outline: none;
}
a {
  text-decoration: none;
  color: white;
}
h1 {
  grid-column: 1 / -1;
  margin-bottom: 25px;
  text-align: center;
  font-size: 24px;
  font-family: "IzhitsaCyrillic", "Times", "Times New Roman", "Georgia", serif;
  font-weight: 900;
}
h2 {
  text-align: center;
  font-size: 24px;
  font-family: "IzhitsaCyrillic", "Times", "Times New Roman", "Georgia", serif;
  font-weight: 900;
}
`;

ReactDOM.render(
  <BrowserRouter >
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </BrowserRouter>
  , document.getElementById('root'));

serviceWorker.unregister();