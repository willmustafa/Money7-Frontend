import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Third part
import 'bootstrap/dist/css/bootstrap.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

// Styles
import './assets/css/styles.css'
import './assets/css/icones.css'

// Views
import App from './App'
import { AuthProvider } from './context/AuthProvider'
import ToastProvider from './context/toastContext'

// Font Awesome Globally
library.add(fas)

const root = ReactDOM.createRoot(
	document.getElementById('root'),
)

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ToastProvider>
					<App />
				</ToastProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
)
