import ReactDOM from 'react-dom/client';

//
import App from './App';
import "./app.css"
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './components/context/drivercontext';
import {CitiesProvider } from './components/context/dashdriverContext';

import { PassengerContextProvider } from './components/context/passengercontext';
import { VehicleContextProvider } from './components/context/vehicleContext';
import { AirportContextProvider } from './components/context/airportContext';

import {Provider} from 'react-redux'
import store from './store/store'

// ----------------------------------------------------------------------


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   
 <Provider store={store}>
 <App />
 </Provider>

);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
