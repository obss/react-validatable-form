import { GTMProvider } from '@elgorditosalsero/react-gtm-hook';
import './App.css';
import Main from './components/Main';

function App() {
    const gtmParams = { id: process.env.REACT_APP_GOOGLE_TAG_MANAGER_ID };
    let appJsx = <Main />;
    if (process.env.NODE_ENV === 'production') {
        appJsx = (
            <GTMProvider state={gtmParams}>
                <Main />
            </GTMProvider>
        );
    }
    return appJsx;
}

export default App;
