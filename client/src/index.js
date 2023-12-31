import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerList from './components/customers/CustomerList';
import StylistList from './components/stylists/StylistList';
import ServiceList from './components/services/ServiceList';
import AppointmentList from './components/appointments/AppointmentList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="appointments">
          <Route index element={<AppointmentList />} />
          <Route path=":id" element={<p>Appointment Details</p>} />
        </Route>
        <Route path="services">
          <Route index element={<ServiceList />} />
          <Route path=':id' element={<p>Service Details</p>} />
        </Route>
        <Route path="stylists">
          <Route index element={<StylistList />} />
          <Route path=':id' element={<p>Stylist Details</p>} />
        </Route>
        <Route path="customers">
          <Route index element={<CustomerList />} />
          <Route path=':id' element={<p>Customer Details</p>} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
