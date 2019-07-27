import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import * as registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker.unregister();

