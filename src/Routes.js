import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route } from  'react-router-dom'

import App from './App'

const Routes = () => {
    return (
        <Router>
            <Fragment>
                <Route exact path="/" component={App} />
            </Fragment>
        </Router>
    )
}

export default Routes
