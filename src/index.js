import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
import { LoginContextProvider } from './contexts/LoginContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<LoginContextProvider>
		<React.StrictMode>
			<Router>
				<App />
			</Router>
		</React.StrictMode>
	</LoginContextProvider>,
);
