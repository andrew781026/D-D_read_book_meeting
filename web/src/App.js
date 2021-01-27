import Layout from "./views/Layout";

// react-router
import {BrowserRouter} from 'react-router-dom';
import AppContext from './routes/AppContext';
import routes from './routes/routesConfig';

function App() {
    return (
        <AppContext.Provider value={{routes}}>
            <BrowserRouter>
                <Layout/>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
