import React from 'react';
import {renderRoutes} from "react-router-config";

// other
import AppContext from '../routes/AppContext';
import Loading from '../views/loading/Loading';

const App = (props) => {

    return (
        <AppContext.Consumer>
            {/* Consumer 會將 AppContext.Provider 設定的 value 取出到 children 中 */}
            {({routes}) => {

                return (
                    <React.Suspense fallback={<Loading/>}>
                        {renderRoutes(routes)}
                    </React.Suspense>
                )
            }}
        </AppContext.Consumer>
    );
};

export default App;
