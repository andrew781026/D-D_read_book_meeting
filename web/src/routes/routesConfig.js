import React from 'react';

const routes = [
    {
        path: "*",
        component: React.lazy(() => import('../views/home/Home'))
    },
]

export default routes;
