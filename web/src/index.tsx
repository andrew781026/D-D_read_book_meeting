import React from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import { Provider } from 'react-redux';
import App from './App';
import {ThemeProvider} from '@material-ui/styles';
import reportWebVitals from './reportWebVitals';
import createStore from './redux/@createStore';

// styling
import './index.css';
import theme from "./style/theme";

ReactDOM.render(
    <Provider store={createStore()}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
