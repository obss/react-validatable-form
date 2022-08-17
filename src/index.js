import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/sidenavigation.css';
import './styles/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
