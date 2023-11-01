import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import './App.css';
import Main from './components/Main';

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Main />
        </LocalizationProvider>
    );
}

export default App;
