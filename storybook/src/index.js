import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/sidenavigation.css';
import './styles/antd.css';
import App from './App';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import reportWebVitals from './reportWebVitals';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';

ReactDOM.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <App />
        </LocalizationProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
