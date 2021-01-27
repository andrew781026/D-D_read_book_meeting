import React from 'react';
import {renderRoutes} from "react-router-config";

// other
import AppContext from '../routes/AppContext';

const App = (props) => {

    return (
        <AppContext.Consumer>
            {/* Consumer 會將  */}
            {({routes}) => {

                return (
                    <React.Suspense fallback={<div>Loading...</div>}>
                        {renderRoutes(routes)}
                    </React.Suspense>
                )
            }}
        </AppContext.Consumer>
    );
};

export default App;
